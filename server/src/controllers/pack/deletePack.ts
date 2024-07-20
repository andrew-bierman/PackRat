import { deletePackService } from '../../services/pack/pack.service';
import * as validator from '@packrat/validations';
import { protectedProcedure } from '../../trpc';

export const deletePack = async (c) => {
  try {
    const { packId } = await c.req.json();
    await deletePackService(packId);
    return c.json({ msg: 'pack was deleted successfully' }, 200);
  } catch (error) {
    return c.json({ error: `Failed to delete pack: ${error.message}` }, 500);
  }
};

export function deletePackRoute() {
  return protectedProcedure
    .input(validator.deletePack)
    .mutation(async (opts) => {
      const { packId } = opts.input;
      await deletePackService(packId);
      return { msg: 'pack was deleted successfully' };
    });
}
