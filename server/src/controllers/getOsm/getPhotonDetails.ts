import {
  InvalidRequestParamsError,
  RetrievingPhotonDetailsError,
} from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { z } from 'zod';
import { publicProcedure, protectedProcedure } from '../../trpc';
import { getPhotonDetailsService } from '../../services/osm/getPhotonDetailsService';

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
  return protectedProcedure
    .input(
      z.object({ id: z.union([z.string(), z.number()]), type: z.string() }),
    )
    .query(async (opts) => {
      const { id, type } = opts.input;
      const { env }: any = opts.ctx;
      return await getPhotonDetailsService(id, type, env.OSM_URI);
    });
}
