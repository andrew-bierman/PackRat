import osmtogeojson from 'osmtogeojson';
import axios from 'axios';
import { updateDatabaseWithGeoJSONDataFromOverpass } from './updateDatabaseWithGeoJSONDataFromOverpass';
import {
  InvalidRequestParamsError,
  RetrievingTrailsOSMError,
} from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure } from '../../trpc';
import * as validators from "../../../../packages/src/validations"


/**
 * Retrieves trails data from OpenStreetMap (OSM) based on the provided latitude, longitude, and radius.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - Resolves with the geojsonData of trails retrieved from OSM.
 */
export const getTrailsOSM = async (req, res, next) => {
  try {
    // set default values for lat, lon, and radius
    const { lat = 45.5231, lon = -122.6765, radius = 50000 } = req.query;

    if (!lat || !lon || !radius) {
      next(InvalidRequestParamsError);
    }

    const overpassUrl = process.env.OSM_URI;

    const overpassQuery = `
      [out:json][timeout:25];
      (
        way["highway"~"footway"]["name"](around:${radius},${lat},${lon});
      );
      out tags geom qt;
      `;

    const response = await axios.post(overpassUrl, overpassQuery, {
      headers: { 'Content-Type': 'text/plain' },
    });
    const geojsonData = osmtogeojson(response.data);

    updateDatabaseWithGeoJSONDataFromOverpass(geojsonData);

    res.locals.data = geojsonData;
    responseHandler(res);
  } catch (error) {
    next(RetrievingTrailsOSMError);
  }
};

export function getTrailsOSMRoute() {
  return publicProcedure.input(validators.getTrailsOSM).query(async (opts) => {
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
        way["highway"~"footway"]["name"](around:${radius},${lat},${lon});
      );
      out tags geom qt;
      `;

    const response = await axios.post(overpassUrl, overpassQuery, {
      headers: { 'Content-Type': 'text/plain' },
    });
    const geojsonData = osmtogeojson(response.data);

    updateDatabaseWithGeoJSONDataFromOverpass(geojsonData);

    return geojsonData;
  });
}