import { UnableToDeletePackError } from '../../helpers/errors';
import { deletePackService } from '../../services/pack/pack.service';
import * as validator from '../../middleware/validators/index';
import { publicProcedure } from '../../trpc';
import { TRPCError } from '@trpc/server';
/**
 * Deletes a pack.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the deletion result.
 */
export const deletePack = async (req, res, next) => {
  try {
    const { packId } = req.body;

    await deletePackService(packId);

    res.status(200).json({ msg: 'pack was deleted successfully' });
  } catch (error) {
    next(UnableToDeletePackError);
  }
};

export function deletePackRoute() {
  return publicProcedure.input(validator.deletePack).mutation(async (opts) => {
    try {
      const { packId } = opts.input;
      await deletePackService(packId);
      return { msg: 'pack was deleted successfully' };
    } catch (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: UnableToDeletePackError.message });
    }
  });
}