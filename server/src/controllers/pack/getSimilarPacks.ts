import { publicProcedure } from '../../trpc';
import { getSimilarPacksService } from '../../services/pack/pack.service';
import { getSimilarPacks } from '@packrat/validations';

export function getSimilarPacksRoute() {
  return publicProcedure.input(getSimilarPacks).query(async (opts) => {
    const { id, limit, visibility } = opts.input;

    if (limit < 1) {
      throw new Error('limit must be greater than 0');
    }

    const packs = await getSimilarPacksService(id, limit, visibility);
    return packs;
  });
}
