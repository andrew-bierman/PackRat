import { z } from 'zod';
import { getFavoritePacksByUserService } from '../../services/favorite/favorite.service';
import { publicProcedure, protectedProcedure } from '../../trpc';
import { type Context } from 'hono';
import { responseHandler } from '../../helpers/responseHandler';

// /**
//  * Retrieves favorite packs for a user.
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  * @return {Promise} - The favorite packs of the user.
//  */
// export const getFavoritePacksByUser = async (req, res, next) => {
//   const { userId } = req.body;
//   const packs = await getFavoritePacksByUserService(userId);
//   if (!packs) next(PackNotFoundError);
//   res.locals.data = packs;
//   responseHandler(res);
// };

export async function getFavoritePacksByUser(ctx: Context) {
  try {
    const { userId } = await ctx.req.param();
    const packs = await getFavoritePacksByUserService(userId);
    if (!packs) {
      ctx.set('data', { error: 'Packs not Found' });
      return await responseHandler(ctx);
    }
    ctx.set('data', packs);
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
}

export function getFavoritePacksByUserRoute() {
  return protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      const { userId } = opts.input;
      const packs = await getFavoritePacksByUserService(userId);
      return packs;
    });
}
