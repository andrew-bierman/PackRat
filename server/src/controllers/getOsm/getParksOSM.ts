import { getParksOSMService } from '../../services/osm/getParksOSMService';
import {
  ErrorRetrievingParksOSMError,
  InvalidRequestParamsError,
} from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure } from '../../trpc';
import { z } from 'zod';
// import * as validators from '@packrat/validations';
import * as validator from '@packrat/validations';

/**
 * Retrieves parks data from OpenStreetMap based on the provided latitude, longitude, and radius.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} The response object containing the parks data.
 */
// export const getParksOSM = async (req, res, next) => {
//   try {
//     const { lat = 45.5231, lon = -122.6765, radius = 50000 } = req.query;

//     if (!lat || !lon || !radius) {
//       next(InvalidRequestParamsError);
//     }
//     const result = await getParksOSMService(lat, lon, radius);
//     res.locals.data = result;
//     responseHandler(res);
//   } catch (error) {
//     console.error(error);
//     next(ErrorRetrievingParksOSMError);
//   }
// };

export function getParksOSMRoute() {
  return publicProcedure.input(validator.getParksOSM).query(async (opts) => {
    const { lat = 45.5231, lon = -122.6765, radius = 50000 } = opts.input;
    const { env }: any = opts.ctx;
    return await getParksOSMService(lat, lon, radius, env.OSM_URI);
  });
}
