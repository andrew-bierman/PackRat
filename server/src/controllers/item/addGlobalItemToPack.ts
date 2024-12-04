import { protectedProcedure } from '../../trpc';
import { addGlobalItemToPackService } from '../../services/item/item.service';
import { type Context } from 'hono';
import * as validators from '@packrat/validations';

export const addGlobalItemToPack = async (c: Context) => {
  try {
    const { packId, itemId, ownerId, quantity } = await c.req.json();
    const item = await addGlobalItemToPackService(
      packId,
      itemId,
      ownerId,
      quantity,
    );
    return c.json({ item }, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function addGlobalItemToPackRoute() {
  return protectedProcedure
    .input(validators.addGlobalItemToPack)
    .mutation(async (opts) => {
      const { packId, itemId, ownerId, quantity } = opts.input;
      const item = await addGlobalItemToPackService(
        packId,
        itemId,
        ownerId,
        quantity,
      );
      return item;
    });
}
