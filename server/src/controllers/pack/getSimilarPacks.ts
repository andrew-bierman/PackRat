import { publicProcedure } from '../../trpc';
import { getSimilarPacksService } from '../../services/pack/pack.service';
import { z } from 'zod';

export function getSimilarPacksRoute() {
  return publicProcedure
    .input(z.object({ id: z.string(), limit: z.number() }))
    .query(async (opts) => {
      const { id, limit } = opts.input;
      const packs = await getSimilarPacksService(id, limit);
      return packs;
    });
}
