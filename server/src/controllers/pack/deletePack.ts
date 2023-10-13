import { UnableToDeletePackError } from '../../helpers/errors';
import { deletePackService } from '../../services/pack/pack.service';
import * as validator from '../../middleware/validators/index';
import { publicProcedure } from '../../trpc';
/**
 * Deletes a pack.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the deletion result.
 */
export const deletePack = async (c, next) => {
  try {
    const { packId } = c.req.json();

    await deletePackService(packId);

    c.status(200).json({ msg: 'pack was deleted successfully' });
  } catch (error) {
    next(UnableToDeletePackError);
  }
};

export function deletePackRoute() {
  return publicProcedure.input(validator.deletePack).mutation(async (opts) => {
    const { packId } = opts.input;
    await deletePackService(packId);
    return { msg: 'pack was deleted successfully' };
  });
}
