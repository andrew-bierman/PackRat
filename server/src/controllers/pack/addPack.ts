import { addPackService } from '../../services/pack/pack.service';
import * as validator from '@packrat/validations';
import { protectedProcedure } from '../../trpc';

export const addPack = async (c) => {
  try {
    const { name, owner_id, is_public } = await c.req.json();
    const pack = await addPackService(name, owner_id, is_public);
    return c.json({ pack }, 200);
  } catch (error) {
    return c.json({ error: `Failed to add pack: ${error.message}` }, 500);
  }
};

export function addPackRoute() {
  return protectedProcedure.input(validator.addPack).mutation(async (opts) => {
    const { name, owner_id, is_public } = opts.input;
    const pack = await addPackService(
      name,
      owner_id,
      is_public,
      opts.ctx.executionCtx,
    );
    return pack;
  });
}
