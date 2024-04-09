import osmtogeojson from 'osmtogeojson';
import axios from 'axios';
import {
  ErrorProcessingOverpassError,
  ErrorRetrievingOverpassError,
  InvalidRequestParamsError,
} from '../../helpers/errors';

export const getOsmService = async ({ activityType, startPoint, endPoint }) => {
  const overpassUrl = process.env.OSM_URI;

  if (!overpassUrl) {
    throw new Error('OSM_URI is not defined in the environment variables');
  }

  try {
    const overpassQuery = await formatOverpassQuery(
      activityType,
      startPoint,
      endPoint,
    );

    const response = await axios.post(overpassUrl, overpassQuery, {
      headers: { 'Content-Type': 'text/plain' },
    });

    if (response.status === 200) {
      const responseFormat = response.data;
      const geojsonData = osmtogeojson(responseFormat);
      return geojsonData;
    } else {
      // throw ErrorProcessingOverpassError;
      return ErrorProcessingOverpassError;
    }
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
