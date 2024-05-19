import {
  InvalidRequestParamsError,
  RetrievingPhotonDetailsError,
} from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import { getPhotonDetailsService } from '../../services/osm/getPhotonDetailsService';
import { TripActivity } from '@packrat/validations';

/**
 * Retrieves Photon details based on the provided ID and type.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The function does not return anything.
 */
// export const getPhotonDetails = async (req, res, next) => {
//   const { id, type } = req.params;
//   if (!id || !type) {
//     next(InvalidRequestParamsError);
//   }
//   try {
//     const result = await getPhotonDetailsService(id, type);
//     res.locals.data = result;
//     responseHandler(res);
//   } catch (error) {
//     next(RetrievingPhotonDetailsError);
//   }
// };

export function getPhotonDetailsRoute() {
  return publicProcedure
    .input(
      z.object({ id: z.union([z.string(), z.number()]), type: z.string(), activity: z.nativeEnum(TripActivity).optional() }),
    )
    .query(async (opts) => {
      const { id, type, activity } = opts.input;
      const { env }: any = opts.ctx;
      return await getPhotonDetailsService(id, {type, activity, osmUri: env.OSM_URI});
    });
}
