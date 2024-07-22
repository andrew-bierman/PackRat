import { protectedProcedure } from '../../trpc';
import { getItemByIdService } from '../../services/item/item.service';
import * as validator from '@packrat/validations';
import { type Context } from 'hono';

export const getItemById = async (c: Context) => {
  try {
    const { id } = await c.req.param();
    const item = await getItemByIdService(id);
    return c.json({ item }, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function getItemByIdRoute() {
  return protectedProcedure.input(validator.getItemById).query(async (opts) => {
    const { id } = opts.input;
    const item = await getItemByIdService(id);
    return item;
  });
}
