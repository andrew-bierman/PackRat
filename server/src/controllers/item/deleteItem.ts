import { deleteItemService } from '../../services/item/item.service';
import * as validator from '@packrat/validations';
import { publicProcedure, protectedProcedure } from '../../trpc';

/**
 * Deletes an item from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The deleted item.
 */

export const deleteItem = async (c) => {
  try {
    const { itemId, packId } = await c.req.parseBody();
    const itemDeleted = await deleteItemService(itemId, packId);
    return c.json({ itemDeleted }, 200);
  } catch (error) {
    return c.json({ error: `Failed to delete item: ${error.message}` }, 500);
  }
};

export function deleteItemRoute() {
  return protectedProcedure
    .input(validator.deleteItem)
    .mutation(async (opts) => {
      const { itemId, packId } = opts.input;
      return await deleteItemService(itemId, packId);
    });
}
