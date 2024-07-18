import { protectedProcedure } from '../../trpc';
import { scorePackService } from '../../services/pack/pack.service';
import * as validator from '@packrat/validations';

export const scorePack = async (c) => {
  try {
    const { packId } = await c.req.param();
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
