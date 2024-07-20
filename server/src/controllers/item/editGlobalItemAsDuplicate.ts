import { editGlobalItemAsDuplicateService } from '../../services/item/item.service';
import { z } from 'zod';
import { protectedProcedure } from '../../trpc';

export const editGlobalItemAsDuplicate = async (c) => {
  try {
    const { itemId } = await c.req.param();
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
        opts.ctx.executionCtx,
      );
      return item;
    });
}
