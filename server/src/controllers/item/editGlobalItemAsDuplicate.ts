import { editGlobalItemAsDuplicateService } from '../../services/item/item.service';
import { z } from 'zod';
import { publicProcedure, protectedProcedure } from '../../trpc';

/**
 * Edit a global item by duplicating it with new changes.
 * @param {Object} req - The request object.
 * @param {Object} req.params - The parameters object.
 * @param {string} req.params.itemId - The ID of the item to edit.
 * @param {Object} req.body - The request body object.
 * @param {string} req.body.packId - The ID of the pack.
 * @param {string} req.body.name - The name of the item.
 * @param {number} req.body.weight - The weight of the item.
 * @param {number} req.body.quantity - The quantity of the item.
 * @param {string} req.body.unit - The unit of the item.
 * @param {string} req.body.type - The type of the item.
 * @param {Object} res - The response object.
 * @return {Object} The updated item.
 */
export const editGlobalItemAsDuplicate = async (c) => {
  try {
    const { itemId } = await c.req.parseParams();
    const { packId, name, weight, quantity, unit, type } =
      await c.req.parseBody();

    const item = await editGlobalItemAsDuplicateService(
      itemId,
      packId,
      name,
      weight,
      quantity,
      unit,
      type,
    );
    return c.json({ item }, 200);
  } catch (error) {
    return c.json(
      { error: `Failed to edit item as duplicate: ${error.message}` },
      500,
    );
  }
};

export function editGlobalItemAsDuplicateRoute() {
  return protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
        packId: z.string(),
        name: z.string(),
        weight: z.number(),
        quantity: z.number(),
        unit: z.string(),
        type: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { itemId, packId, name, weight, quantity, unit, type } = opts.input;
      const item = await editGlobalItemAsDuplicateService(
        itemId,
        packId,
        name,
        weight,
        quantity,
        unit,
        type,
      );
      return item;
    });
}
