import { protectedProcedure } from '../../trpc';
import { z } from 'zod';
import { toggleItemPackService } from 'src/services/item/toggleItemPackService';

export function toggleItemPack() {
  return protectedProcedure
    .input(
      z.object({
        packId: z.string(),
        itemId: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { packId, itemId } = opts.input;
      const item = await toggleItemPackService({ packId, itemId });
      return item;
    });
}
