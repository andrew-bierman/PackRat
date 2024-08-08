import { protectedProcedure } from '../../trpc';
import { deleteGlobalItemService } from '../../services/item/item.service';
import { z } from 'zod';

export const deleteGlobalItem = async (c) => {
  try {
    const { itemId } = await c.req.json();
    const itemDeleted = await deleteGlobalItemService(
      itemId,
      c.ctx.executionCtx,
    );
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
      return await deleteGlobalItemService(itemId, opts.ctx.executionCtx);
    });
}
