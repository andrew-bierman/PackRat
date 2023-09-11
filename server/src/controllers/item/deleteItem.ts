import { UnableToDeleteItemError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { deleteItemService } from '../../services/item/item.service';
import * as validator from '../../../../packages/src/validations';
import { publicProcedure } from '../../trpc';
/**
 * Deletes an item from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The deleted item.
 */

export const deleteItem = async (req, res, next) => {
  try {
    const { itemId, packId } = req.body;

    const itemDeleted = await deleteItemService(itemId, packId);

    res.locals.data = itemDeleted;
    responseHandler(res);
  } catch (error) {
    console.error(error);
    next(UnableToDeleteItemError);
  }
};

export function deleteItemRoute() {
  return publicProcedure.input(validator.deleteItem)
    .mutation(async (opts) => {
      const { itemId, packId } = opts.input;
      return await deleteItemService(itemId, packId);
    });
}