import { publicProcedure, protectedProcedure } from '../../trpc';
import { getPackByIdService } from '../../services/pack/pack.service';
import * as validator from '@packrat/validations';

/**
 * Retrieves a pack by its ID and returns it as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The pack object as a JSON response.
 */
export const getPackById = async (c) => {
  try {
    const { packId } = await c.req.parseParams();
    const pack = await getPackByIdService(packId);
    return c.json({ pack }, 200);
  } catch (error) {
    return c.json({ error: `Failed to get pack: ${error.message}` }, 500);
  }
};

export function getPackByIdRoute() {
  return protectedProcedure.input(validator.getPackById).query(async (opts) => {
    const { packId } = opts.input;
    const pack = await getPackByIdService(packId);
    return pack;
  });
}
