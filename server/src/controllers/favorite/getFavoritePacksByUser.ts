import { z } from 'zod';
import { PackNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';

import { getFavoritePacksByUserService } from '../../services/favorite/favorite.service';
import { publicProcedure } from '../../trpc';
import { Pack } from '../../prisma/methods';

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
  return publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      const { userId } = opts.input;
      const { prisma }: any = opts.ctx;
      const packs = await getFavoritePacksByUserService(prisma, userId);
      const jsonPacks = packs.map((pack) => Pack(pack)?.toJSON());
      return jsonPacks;
    });
}
