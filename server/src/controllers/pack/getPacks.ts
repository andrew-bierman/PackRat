import { getPacksService } from '../../services/pack/pack.service';
import { protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';

export const getPacks = async (c) => {
  try {
    const { ownerId, queryBy } = await c.req.param();
    const packs = await getPacksService(ownerId, queryBy || null);
    return c.json({ packs, message: 'Packs retrieved successfully' }, 200);
  } catch (error) {
    return c.json({ error: `Failed to get packs: ${error.message}` }, 500);
  }
};

export function getPacksRoute() {
  return protectedProcedure.input(validator.getPacks).query(async (opts) => {
    const { ownerId, queryBy } = opts.input;

    const packs = await getPacksService(
      ownerId,
      queryBy,
      opts?.ctx?.user?.id !== ownerId,
    );
    return {
      packs,
      message: 'Packs retrieved successfully',
    };
  });
}
