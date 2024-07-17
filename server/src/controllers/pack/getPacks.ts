import { getPacksService } from '../../services/pack/pack.service';
import { publicProcedure, protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';

/**
 * Retrieves packs associated with a specific owner.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise} - Array of packs.
 */
export const getPacks = async (c) => {
  try {
    const { ownerId, queryBy } = await c.req.parseQuery();
    const packs = await getPacksService(ownerId, queryBy);
    return c.json({ packs, message: 'Packs retrieved successfully' }, 200);
  } catch (error) {
    return c.json({ error: `Failed to get packs: ${error.message}` }, 500);
  }
};

export function getPacksRoute() {
  return protectedProcedure.input(validator.getPacks).query(async (opts) => {
    const { ownerId, queryBy } = opts.input;
    const packs = await getPacksService(ownerId, queryBy);
    return {
      packs,
      message: 'Packs retrieved successfully',
    };
  });
}
