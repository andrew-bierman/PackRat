import { protectedProcedure } from '../../trpc';
import { addGlobalItemToPackService } from '../../services/item/item.service';
import { z } from 'zod';

export const addGlobalItemToPack = async (c) => {
  try {
    const { packId, itemId, ownerId } = await c.req.parseBody();
    const item = await addGlobalItemToPackService(packId, itemId, ownerId);
    return c.json({ item }, 200);
  } catch (error) {
    return c.json(
      { error: `Failed to add item to pack: ${error.message}` },
      500,
    );
  }
};

export function addGlobalItemToPackRoute() {
  return protectedProcedure
    .input(
      z.object({
        packId: z.string(),
        itemId: z.string(),
        ownerId: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { packId, itemId, ownerId } = opts.input;
      const item = await addGlobalItemToPackService(packId, itemId, ownerId);
      return item;
    });
}
