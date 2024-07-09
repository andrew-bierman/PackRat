import { z } from 'zod';
import { getFavoritePacksByUserService } from '../../services/favorite/favorite.service';
import { publicProcedure, protectedProcedure } from '../../trpc';

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

export function getFavoritePacksByUserRoute() {
  return protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      const { userId } = opts.input;
      const packs = await getFavoritePacksByUserService(userId);
      return packs;
    });
}
