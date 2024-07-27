import { protectedProcedure } from '../../trpc';
import { getSimilarPacksService } from '../../services/pack/pack.service';
import * as validator from '@packrat/validations';

export const getSimilarPacks = async (c) => {
  try {
    const { id, limit, visibility } = await c.req.json();

    if (limit < 1) {
      throw new Error('limit must be greater than 0');
    }

    const packs = await getSimilarPacksService(id, limit, visibility);
    return c.json({ packs }, 200);
  } catch (error) {
    return c.json(
      { error: `Failed to get similar packs: ${error.message}` },
      500,
    );
  }
};

export function getSimilarPacksRoute() {
  return protectedProcedure
    .input(validator.getSimilarPacks)
    .query(async (opts) => {
      const { id, limit, visibility } = opts.input;

      if (limit < 1) {
        throw new Error('limit must be greater than 0');
      }

      const packs = await getSimilarPacksService(id, limit, visibility);
      return packs;
    });
}
