import {
  InvalidRequestParamsError,
  RetrievingPhotonDetailsError,
} from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { z } from 'zod';
import { publicProcedure, protectedProcedure } from '../../trpc';
import { getPhotonDetailsService } from '../../services/osm/getPhotonDetailsService';
import { Context } from 'hono';

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

export async function getPhotonDetails(ctx: Context) {
  try {
    const { id, type } = await ctx.req.param();
    const { env }: any = ctx;
    const response = await getPhotonDetailsService(id, type, env.OSM_URI);
    if (!response) {
      ctx.set('data', { data: 'No Photons Details Found' });
      return await responseHandler(ctx);
    }
    ctx.set('data', { data: response });
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', { error: error.message });
    return await responseHandler(ctx);
  }
}

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
