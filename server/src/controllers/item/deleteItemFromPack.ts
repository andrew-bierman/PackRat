import { protectedProcedure } from '../../trpc';
import { z } from 'zod';
import { type Context } from 'hono';
import { deleteItemFromPack } from 'src/services/item/deleteItemFromPack';

export function deleteItemFromPackRoute() {
  return protectedProcedure
    .input(
      z.object({
        packId: z.string(),
        itemId: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { packId, itemId } = opts.input;
      const item = await deleteItemFromPack(packId, itemId);
      return item;
    });
}
