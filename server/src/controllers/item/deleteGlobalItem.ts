import { publicProcedure, protectedProcedure } from '../../trpc';
import { deleteGlobalItemService } from '../../services/item/item.service';
import { z } from 'zod';

/**
 * Deletes a global item.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - Returns a promise that resolves to void.
 */
export const deleteGlobalItem = async (c) => {
  try {
    const { itemId } = await c.req.parseBody();
    const itemDeleted = await deleteGlobalItemService(itemId);
    return c.json({ itemDeleted }, 200);
  } catch (error) {
    return c.json(
      { error: `Failed to delete global item: ${error.message}` },
      500,
    );
  }
};

export function deleteGlobalItemRoute() {
  return protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { itemId } = opts.input;
      return await deleteGlobalItemService(itemId);
    });
}
