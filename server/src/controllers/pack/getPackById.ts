import { protectedProcedure } from '../../trpc';
import { getPackByIdService } from '../../services/pack/pack.service';
import * as validator from '@packrat/validations';

export const getPackById = async (c) => {
  try {
    const { packId } = await c.req.param();
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
