import { UnableToDuplicatePackError } from '../../helpers/errors';
import { duplicatePublicPackService } from '../../services/pack/pack.service';
import * as validator from '../../middleware/validators/index';
import { publicProcedure } from '../../trpc';
import { TRPCError } from '@trpc/server';
/**
 * Duplicates a public pack.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} - a promise that resolves with the duplicated pack
 */
export const duplicatePublicPack = async (req, res, next) => {
  try {
    const { packId, ownerId, items } = req.body;

    const result = await duplicatePublicPackService(packId, ownerId, items);

    res.status(200).json({
      msg: 'pack was duplicated successfully',
      data: result.pack,
    });
  } catch (error) {
    next(UnableToDuplicatePackError);
  }
};

export function duplicatePublicPackRoute() {
  return publicProcedure.input(validator.duplicatePublicPack).mutation(async (opts) => {
    try {
      const { packId, ownerId, items } = opts.input;
      const result = await duplicatePublicPackService(packId, ownerId, items);
      return result.pack;
    } catch (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: UnableToDuplicatePackError.message });
    }
  });
}