import { duplicatePublicPackService } from '../../services/pack/pack.service';
import * as validator from '@packrat/validations';
import { publicProcedure } from '../../trpc';

/**
 * Duplicates a public pack.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} - a promise that resolves with the duplicated pack
 */
// export const duplicatePublicPack = async (req, res, next) => {
//   try {
//     const { packId, ownerId, items } = req.body;

//     const result = await duplicatePublicPackService(packId, ownerId, items);

//     res.status(200).json({
//       msg: 'pack was duplicated successfully',
//       data: result.pack,
//     });
//   } catch (error) {
//     next(UnableToDuplicatePackError);
//   }
// };

export function duplicatePublicPackRoute() {
  return publicProcedure
    .input(validator.duplicatePublicPack)
    .mutation(async (opts) => {
      const { packId, ownerId, items } = opts.input;
      const result = await duplicatePublicPackService(
        packId,
        ownerId,
        items,
        opts.ctx.executionCtx,
      );
      return result;
    });
}
