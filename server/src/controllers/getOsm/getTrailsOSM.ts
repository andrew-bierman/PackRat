import { getTrailsOsmService } from '../../services/osm/getTrailsOSMService';
import {
  InvalidRequestParamsError,
  RetrievingTrailsOSMError,
} from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure, protectedProcedure } from '../../trpc';
import * as z from 'zod';
// import * as validators from '@packrat/validations';
import * as validator from '@packrat/validations';

/**
 * Retrieves trails data from OpenStreetMap (OSM) based on the provided latitude, longitude, and radius.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - Resolves with the geojsonData of trails retrieved from OSM.
 */
// export const getTrailsOSM = async (req, res, next) => {
//   try {
//     const { lat = 45.5231, lon = -122.6765, radius = 50000 } = req.query;

//     if (!lat || !lon || !radius) {
//       next(InvalidRequestParamsError);
//     }
//     const geojsonData = await getTrailsOsmService(lat, lon, radius);
//     res.locals.data = geojsonData;
//     responseHandler(res);
//   } catch (error) {
//     next(RetrievingTrailsOSMError);
//   }
// };

export function getTrailsOSMRoute() {
  return protectedProcedure
    .input(validator.getTrailsOSM)
    .query(async (opts) => {
      const { lat = 45.5231, lon = -122.6765, radius = 50000 } = opts.input;
      const { env }: any = opts.ctx;
      return await getTrailsOsmService(env.OSM_URI, lat, lon, radius);
    });
}
