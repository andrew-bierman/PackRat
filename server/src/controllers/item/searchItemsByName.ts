import { protectedProcedure } from '../../trpc';
import { searchItemsByNameService } from '../../services/item/item.service';
import { z } from 'zod';
import { type Context } from 'hono';

export const searchItemsByName = async (c: Context) => {
  try {
    const { name } = await c.req.query();

    const items = await searchItemsByNameService(name);
    return c.json({ items }, 200);
  } catch (error) {
    return c.json({ error: `Failed to get items: ${error.message}` }, 500);
  }
};

export function searchItemsByNameRoute() {
  return protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async (opts) => {
      const { name } = opts.input;
      const items = await searchItemsByNameService(name);
      return items;
    });
}
