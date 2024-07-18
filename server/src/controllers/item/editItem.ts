import { publicProcedure, protectedProcedure } from '../../trpc';
import { editItemService } from '../../services/item/item.service';
import * as validator from '@packrat/validations';
import { type Context } from 'hono';
import { responseHandler } from '../../helpers/responseHandler';

export const editItem = async (c) => {
  try {
    const { id, name, weight, unit, quantity, type } = await c.req.parseBody();

    const item = await editItemService(id, name, weight, unit, quantity, type);
    return c.json({ item }, 200);
  } catch (error) {
    return c.json({ error: `Failed to edit item: ${error.message}` }, 500);
  }
};

export async function editItem(ctx: Context) {
  try {
    const { id, name, weight, unit, quantity, type } = await ctx.req.json();

    if (type !== 'Food' && type !== 'Water' && type !== 'Essentials') {
      throw new Error('Invalid item type');
    }

    const item = await editItemService(id, name, weight, unit, quantity, type);
    ctx.set('data', item);
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
}

export function editItemRoute() {
  return protectedProcedure.input(validator.editItem).mutation(async (opts) => {
    const { id, name, weight, unit, quantity, type } = opts.input;

    if (type !== 'Food' && type !== 'Water' && type !== 'Essentials') {
      throw new Error('Invalid item type');
    }

    const item = await editItemService(id, name, weight, unit, quantity, type);
    return item;
  });
}
