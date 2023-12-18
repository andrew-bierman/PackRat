import osmtogeojson from 'osmtogeojson';
import {
  ErrorProcessingOverpassError,
  ErrorRetrievingOverpassError,
  InvalidRequestParamsError,
} from '../../helpers/errors';

export const getOsmService = async ({
  activityType,
  startPoint,
  endPoint,
  osmURI,
}) => {
  const overpassUrl = osmURI;
  try {
    const overpassQuery = await formatOverpassQuery(
      activityType,
      startPoint,
      endPoint,
    );

    const res = await fetch(overpassUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: overpassQuery,
    });

    if (!res.ok) return ErrorProcessingOverpassError;

    const json = await res.json();

    const responseFormat = json;
    const geojsonData = osmtogeojson(responseFormat);
    return geojsonData;
  } catch (error) {
    // throw ErrorRetrievingOverpassError;
    return ErrorRetrievingOverpassError;
  }
};

async function formatOverpassQuery(activityType, startPoint, endPoint) {
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
  const tagString = activityTypeTags[activityType];
  const overpassQuery = `[out:json][timeout:25];
        (
          way${tagString}(${startPoint.latitude},${startPoint.longitude},${endPoint.latitude},${endPoint.longitude});
        );
        (._;>;);
        out skel qt;`;

  return overpassQuery;
}
