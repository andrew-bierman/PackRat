import { publicProcedure } from '../../trpc';
import { UnableToDeleteItemError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { deleteGlobalItemService } from '../../services/item/item.service';
import * as validators from "@packrat/packages"
import { authorizedProcedure } from '../../middleware/authorizedProcedure';
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
  return authorizedProcedure.input(validators.deleteGlobalItem)
    .mutation(async (opts) => {
      const { itemId } = opts.input;
      return await deleteGlobalItemService(itemId);
    });
}