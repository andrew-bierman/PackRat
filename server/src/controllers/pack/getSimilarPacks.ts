import { publicProcedure } from '../../trpc';
import { getSimilarPacksService } from '../../services/pack/pack.service';
import { z } from 'zod';

/**
 * Retrieves packs that are similar to provided pack.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} - a promise that resolves with an array of similar packs
 */
export function getSimilarPacksRoute() {
  return publicProcedure
    .input(z.object({ id: z.string(), limit: z.number() }))
    .query(async (opts) => {
      const { id, limit } = opts.input;
      const packs = await getSimilarPacksService(id, limit);
      return packs;
    });
}
