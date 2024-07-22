// import { prisma } from '../../prisma';

import { type ExecutionContext } from 'hono';
import { Item } from '../../drizzle/methods/Item';
import { VectorClient } from '../../vector/client';

/**
 * Deletes a global item by its ID.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} itemId - The ID of the item to be deleted.
 * @return {Promise<Document>} - A promise that resolves to the deleted item.
 */
export const deleteGlobalItemService = async (
  itemId: string,
  executionCtx: ExecutionContext,
): Promise<object> => {
  const itemClass = new Item();
  await itemClass.delete(itemId);

  executionCtx.waitUntil(VectorClient.instance.delete(itemId));

  return { message: 'Item deleted successfully' };
};
