// import { prisma } from '../../prisma';

import { PrismaClient } from '@prisma/client/edge';
import { Item } from '../../drizzle/methods/Item';

/**
 * Deletes a global item by its ID.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} itemId - The ID of the item to be deleted.
 * @return {Promise<Document>} - A promise that resolves to the deleted item.
 */
export const deleteGlobalItemService = async (itemId) => {
  const item = new Item();
  const itemDeleted = await item.delete(itemId);

  return itemDeleted;
};
