import { publicProcedure, protectedProcedure } from '../../trpc';
import { getItemsService } from '../../services/item/item.service';
import * as validator from '@packrat/validations';
import { Context } from 'hono';
import { responseHandler } from '../../helpers/responseHandler';

/**
 * Retrieves a list of items associated with a pack.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.packId - The ID of the pack to retrieve items for.
 * @return {Object} An array of items associated with the pack.
 */
export const getItems = async (c) => {
  try {
    const packId = c.req.param('packId');
    const items = await getItemsService(packId);
    return c.json({ items }, 200);
  } catch (error) {
    return c.json({ error: `Failed to get items: ${error.message}` }, 500);
  }
};

export async function getItems(ctx: Context) {
  try {
    const { packId } = await ctx.req.json();
    const items = await getItemsService(packId);
    ctx.set('data', items);
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
}

export function getItemsRoute() {
  return protectedProcedure.input(validator.getItems).query(async (opts) => {
    const { packId } = opts.input;
    const items = await getItemsService(packId);
    return items;
  });
}
