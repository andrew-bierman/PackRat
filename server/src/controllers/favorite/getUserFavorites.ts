import { z } from 'zod';
import { publicProcedure, protectedProcedure } from '../../trpc';
import { getUserFavoritesService } from '../../services/favorite/favorite.service';
import { type Context } from 'hono';
import { responseHandler } from '../../helpers/responseHandler';

// import { prisma } from '../../prisma';
/**
 * Retrieves the favorite items of a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} An array of favorite items belonging to the user.
 */
// export const getUserFavorites = async (req, res, next) => {
//   const { userId } = req.params;
//   const favorites = await getUserFavoritesService(userId, next);
//   if (!favorites) next(UserFavoritesNotFoundError);
//   res.locals.data = favorites;
//   responseHandler(res);
// };

export async function getUserFavorites(ctx: Context) {
  try {
    const { userId } = await ctx.req.json();
    const favorites = await getUserFavoritesService(userId);
    if (!favorites) {
      ctx.set('data', { data: 'No Favourites Found' });
      return await responseHandler(ctx);
    }
    ctx.set('data', favorites);
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
}

export function getUserFavoritesRoute() {
  return protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      const { userId } = opts.input;
      const favorites = await getUserFavoritesService(userId);
      return favorites;
    });
}
