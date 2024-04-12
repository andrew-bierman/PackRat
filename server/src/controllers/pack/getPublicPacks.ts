import { publicProcedure } from '../../trpc';
import { getPublicPacksService } from '../../services/pack/pack.service';
import { z } from 'zod';

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
      const packs = await getPublicPacksService(queryBy);
      return packs;
    });
}
