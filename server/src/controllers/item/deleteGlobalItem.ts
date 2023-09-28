import { publicProcedure } from '../../trpc';
import { UnableToDeleteItemError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { deleteGlobalItemService } from '../../services/item/item.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
/**
 * Deletes a global item.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - Returns a promise that resolves to void.
 */
export const deleteGlobalItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const itemDeleted = await deleteGlobalItemService(itemId);

    res.locals.data = itemDeleted;
    responseHandler(res);
  } catch (error) {
    next(UnableToDeleteItemError);
  }
};

export function deleteGlobalItemRoute() {
  return publicProcedure.input(z.object({
    itemId: z.string(),
  }))
    .mutation(async (opts) => {
      try {
        const { itemId } = opts.input;
        return await deleteGlobalItemService(itemId);
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: UnableToDeleteItemError.message });
      }
    });
}