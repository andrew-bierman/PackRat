import { publicProcedure, protectedProcedure } from '../../trpc';
import { searchItemsByNameService } from '../../services/item/item.service';
import { z } from 'zod';
import { type Context } from 'hono';
import { responseHandler } from '../../helpers/responseHandler';

/**
 * Searches for items by name.
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query string parameters.
 * @param {string} req.query.name - The name to search for.
 * @param {Object} res - The response object.
 * @return {Array} An array of items matching the search criteria.
 */
export const searchItemsByName = async (c) => {
  try {
    const { name } = c.req.query();
    const items = await searchItemsByNameService(name);
    return c.json({ items }, 200);
  } catch (error) {
    return c.json({ error: `Failed to get items: ${error.message}` }, 500);
  }
};

export async function searchItemsByName(ctx: Context) {
  try {
    const { name } = await ctx.req.json();
    const items = await searchItemsByNameService(name);
    ctx.set('data', items);
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
}

export function searchItemsByNameRoute() {
  return protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async (opts) => {
      const { name } = opts.input;
      const items = await searchItemsByNameService(name);
      return items;
    });
}
