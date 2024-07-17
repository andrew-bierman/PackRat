import { publicProcedure, protectedProcedure } from '../../trpc';
import { scorePackService } from '../../services/pack/pack.service';
import * as validator from '@packrat/validations';

/**
 * Scores a pack by calculating its score and updating the pack object in the database.
 * @param {Object} req - The request object containing the packId parameter.
 * @param {Object} res - The response object used to send the response.
 * @return {Promise} A promise that resolves to the updated pack object or an error message.
 */
export const scorePack = async (c) => {
  try {
    const { packId } = await c.req.parseParams();
    const pack = await scorePackService(packId);
    return c.json({ pack }, 200);
  } catch (error) {
    return c.json({ error: `Failed to score pack: ${error.message}` }, 500);
  }
};

export function scorePackRoute() {
  return protectedProcedure
    .input(validator.getPackById)
    .mutation(async (opts) => {
      const { packId } = opts.input;
      const pack = await scorePackService(packId);
      return pack;
    });
}
