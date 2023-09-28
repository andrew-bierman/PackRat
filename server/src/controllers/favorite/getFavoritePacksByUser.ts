import { z } from 'zod';
import { InternalServerError, PackNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import Pack from '../../models/packModel';
import { getFavoritePacksByUserService } from '../../services/favorite/favorite.service';
import { publicProcedure } from '../../trpc';
import { TRPCError } from '@trpc/server';

/**
 * Retrieves favorite packs for a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} - The favorite packs of the user.
 */
export const getFavoritePacksByUser = async (req, res, next) => {
  const { userId } = req.body;
  const packs = await getFavoritePacksByUserService(userId);
  if (!packs) next(PackNotFoundError);
  res.locals.data = packs;
  responseHandler(res);
};

export function getFavoritePacksByUserRoute() {
  return publicProcedure.input(z.object({ userId: z.string() })).query(async (opts) => {
    try {
      const { userId } = opts.input;
      const packs = await getFavoritePacksByUserService(userId);
      if (!packs) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: PackNotFoundError.message });
      return packs;
    } catch (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: InternalServerError.message });
    }
  });
}