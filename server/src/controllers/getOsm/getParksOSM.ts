import { updateDatabaseWithGeoJSONDataFromOverpass } from './updateDatabaseWithGeoJSONDataFromOverpass';
import osmtogeojson from 'osmtogeojson';
import axios from 'axios';
import {
  ErrorRetrievingParksOSMError,
  InvalidRequestParamsError,
} from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure } from '../../trpc';
import * as validators from "@packrat/packages"
import { authorizedProcedure } from '../../middleware/authorizedProcedure';

/**
 * Retrieves parks data from OpenStreetMap based on the provided latitude, longitude, and radius.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} The response object containing the parks data.
 */
export const getParksOSM = async (req, res, next) => {
  try {
    const { lat = 45.5231, lon = -122.6765, radius = 50000 } = req.query;

    if (!lat || !lon || !radius) {
      next(InvalidRequestParamsError);
    }

    const overpassUrl = process.env.OSM_URI;

    const overpassQuery = `
        [out:json][timeout:25];
        (
          way["leisure"~"park|nature_reserve|garden|recreation_ground"](around:${radius},${lat},${lon});
        );
        (._;>;);
        out tags geom qt;
        `;

    const response = await axios.post(overpassUrl, overpassQuery, {
      headers: { 'Content-Type': 'text/plain' },
    });

    const geojsonData = osmtogeojson(response.data);
    console.log('geojsonData==============', geojsonData);

    updateDatabaseWithGeoJSONDataFromOverpass(geojsonData);
    res.locals.data = geojsonData;
    responseHandler(res);
  } catch (error) {
    console.error(error);
    next(ErrorRetrievingParksOSMError);
  }
};

export function getParksOSMRoute() {
  return authorizedProcedure.input(validators.getParksOSM).query(async (opts) => {
    const { lat, lon, radius } = opts.input;
    const params = {
      lat,
      lon,
      radius,
    };
    const queryString = Object.entries(params)
      .flatMap(([key, values]) =>
        Array.isArray(values)
          ? values.map((val) => `${key}=${val}`)
          : `${key}=${values}`,
      )
      .join('&');

    console.log('queryString----', queryString);

    const overpassUrl = process.env.OSM_URI;

    const overpassQuery = `
      [out:json][timeout:25];
      (
        way["leisure"~"park|nature_reserve|garden|recreation_ground"](around:${radius},${lat},${lon});
      );
      (._;>;);
      out tags geom qt;
      `;

    const response = await axios.post(overpassUrl, overpassQuery, {
      headers: { 'Content-Type': 'text/plain' },
    });
    const geojsonData = osmtogeojson(response.data);
    console.log('geojsonData==============', geojsonData);

    updateDatabaseWithGeoJSONDataFromOverpass(geojsonData);
    
    return geojsonData;
  });
}