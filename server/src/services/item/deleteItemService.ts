// import { prisma } from '../../prisma';

import { type ExecutionContext } from 'hono';
import { Item } from '../../drizzle/methods/Item';
import { ItemPacks } from '../../drizzle/methods/ItemPacks';
import { VectorClient } from '../../vector/client';

/**
 * Deletes an item from the database.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} itemId - The ID of the item to be deleted.
 * @param {string} packId - The ID of the pack that the item belongs to.
 * @return {Promise<object>} - The deleted item object.
 */
export const deleteItemService = async (
  itemId: string,
  executionCtx: ExecutionContext,
) => {
  const itemClass = new Item();

  await itemClass.delete(itemId);

  executionCtx.waitUntil(VectorClient.instance.delete(itemId));

  return { message: 'Item deleted successfully' };
};
