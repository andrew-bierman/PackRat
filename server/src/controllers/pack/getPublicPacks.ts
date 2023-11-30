import { publicProcedure } from '../../trpc';
import { PackNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getPublicPacksService } from '../../services/pack/pack.service';
import { z } from 'zod';
import { Pack } from '../../prisma/methods';

/**
 * Retrieves public packs based on the given query parameter.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} - a promise that resolves with the retrieved public packs
 */
// export const getPublicPacks = async (req, res, next) => {
//   try {
//     const { queryBy } = req.query;

//     const publicPacks = await getPublicPacksService(queryBy);

//     res.locals.data = publicPacks;
//     responseHandler(res);
//   } catch (error) {
//     next(PackNotFoundError);
//   }
// };

export function getPublicPacksRoute() {
  return publicProcedure
    .input(z.object({ queryBy: z.string() }))
    .query(async (opts) => {
      const { queryBy } = opts.input;
      const { prisma }: any = opts.ctx;
      const packs = await getPublicPacksService(prisma, queryBy);
      const jsonPacks = packs.map((pack) => Pack(pack)?.toJSON());
      return jsonPacks;
    });
}
