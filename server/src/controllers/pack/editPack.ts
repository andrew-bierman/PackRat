import { protectedProcedure } from '../../trpc';
import { editPackService } from '../../services/pack/pack.service';
import * as validator from '@packrat/validations';

export const editPack = async (c) => {
  try {
    const packData = await c.req.json();
    const pack = await editPackService(packData, c.ctx.executionCtx);
    return c.json({ pack }, 200);
  } catch (error) {
    return c.json({ error: `Failed to edit pack: ${error.message}` }, 500);
  }
};

export function editPackRoute() {
  return protectedProcedure.input(validator.editPack).mutation(async (opts) => {
    const packData = opts.input;
    const pack = await editPackService(packData, opts.ctx.executionCtx);
    return pack;
  });
}
