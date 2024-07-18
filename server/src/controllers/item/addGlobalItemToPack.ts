import { publicProcedure, protectedProcedure } from '../../trpc';
import { addGlobalItemToPackService } from '../../services/item/item.service';
import { z } from 'zod';
import { type Context } from 'hono';
import { responseHandler } from '../../helpers/responseHandler';

/**
 * Adds a global item to a pack.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated item.
 */
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

export async function addGlobalItemToPack(ctx: Context) {
  try {
    const { packId, itemId, ownerId } = await ctx.req.json();
    const item = await addGlobalItemToPackService(packId, itemId, ownerId);
    if (!item) {
      ctx.set('data', { data: 'Cannot Convert Global Item To Pack' });
      return await responseHandler(ctx);
    }
    ctx.set('data', item);
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
}

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
