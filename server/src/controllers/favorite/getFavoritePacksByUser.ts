import { z } from 'zod';
import { PackNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import Pack from '../../models/packModel';
import { getFavoritePacksByUserService } from '../../services/favorite/favorite.service';
import { publicProcedure } from '../../trpc';

/**
 * Retrieves favorite packs for a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} - The favorite packs of the user.
 */
export const getFavoritePacksByUser = async (c, next) => {
  const { userId } = c.req.json();
  const packs = await getFavoritePacksByUserService(userId);
  if (!packs) next(PackNotFoundError);
  res.locals.data = packs;
  responseHandler(c);
};

export function getFavoritePacksByUserRoute() {
  return publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      const { userId } = opts.input;
      const packs = await getFavoritePacksByUserService(userId);
      return packs;
    });
}
