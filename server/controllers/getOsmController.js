import fetch from 'node-fetch';
import osmtogeojson from 'osmtogeojson';

export const getOsm = async (req, res) => {
    console.log('req', req); // log the request body to see what it looks like

    const overpassUrl = process.env.OSM_URI;

    const activityTypeTags = {
        hiking: '["highway"~"path|footway"]',
        skiing: '["piste:type"~"downhill|nordic"]',
        climbing: '["sport"="climbing"]',
        cycling: '["highway"~"cycleway(:left|:right)?"]',
        canoeing: '["waterway"~"riverbank|canal|stream"]',
        horseback_riding: '["highway"="bridleway"]',
        kayaking: '["waterway"~"riverbank|canal|stream|rapids|waterfall"]',
        rock_climbing: '["natural"="cliff"]',
        sailing: '["waterway"~"riverbank|canal|harbour|basin"]',
    };

    async function formatOverpassQuery(activityType, startPoint, endPoint) {
        const tagString = activityTypeTags[activityType];
        const overpassQuery = `[out:json][timeout:25];
          (
            way${tagString}(${startPoint.latitude},${startPoint.longitude},${endPoint.latitude},${endPoint.longitude});
          );
          (._;>;);
          out skel qt;`;

        return overpassQuery;
    }

    try {

        const { activityType, startPoint, endPoint } = req.body;

        if (!activityType || !startPoint || !endPoint) {
            throw new Error('Invalid request parameters');
        }

        const overpassQuery = await formatOverpassQuery(activityType, startPoint, endPoint);

        console.log('overpassQuery', overpassQuery)

        const response = await fetch(overpassUrl, {
            method: 'POST',
            body: overpassQuery,
            headers: { 'Content-Type': 'text/plain' },
        });

        console.log('response', response)


        if (response.ok) {
            const responseFormat = await response.json();
            const geojsonData = osmtogeojson(responseFormat);
            res.send(geojsonData);
            // res.send(response.text());
        } else {
            console.log(response.status, response.statusText);
            res.send({ message: 'Something went wrong' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Something went wrong' });
    }
};




