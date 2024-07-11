import { publicProcedure, protectedProcedure } from '../../trpc';
import { ErrorFetchingGeoCodeError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { oneEntity } from '../../utils/oneEntity';
// import * as validators from '@packrat/validations';
import { geoCodeService } from '../../services/geocode/geoCodeService';

// /**
//  * Retrieves the geocode for a given address array.
//  * @param {Object} req - The request object.
//  * @param {Object} req.query - The query parameters.
//  * @param {string} req.query.addressArray - The address array to retrieve the geocode for.
//  * @param {Object} res - The response object.
//  * @return {Promise<void>} - A promise that resolves when the geocode is retrieved and the response is sent.
//  */
// export const getGeoCode = async (req, res, next) => {
//   const result: any = await geoCodeService(req.query);
//   if (result.message === 'ok') {
//     res.locals.data = result.result;
//     responseHandler(res);
//   } else {
//     next(ErrorFetchingGeoCodeError);
//   }
// };

export function getGeoCodeRoute() {
  return protectedProcedure.query(async (opts) => {
    if (!opts.input) {
      throw new Error('Input is missing');
    }
    const { addressArray } = opts.input;
    const { env }: any = opts.ctx;
    const result: any = await geoCodeService({
      addressArray,
      geoCodeUri: env.GEO_CODE_URL,
      geoapifyKey: env.GEOAPIFY_KEY,
    });
    return result.message === 'ok' ? result.result : ErrorFetchingGeoCodeError;
  });
}
