import { editGlobalItemAsDuplicateService } from '../../services/item/item.service';
import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import { setItemQuantityService } from '../../services/item/setItemQuantity';
export function setItemQuantityRoute() {
  return protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
        packId: z.string(),
        quantity: z.number(),
      }),
    )
    .mutation(async (opts) => {
      const { itemId, packId, quantity } = opts.input;
      setItemQuantityService({ itemId, packId, quantity });
    });
}
