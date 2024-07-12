// import { prisma } from '../../prisma';

import { Item } from '../../drizzle/methods/Item';
import { Queue } from '../../queue/client';
import { VectorClient } from '../../vector/client';

/**
 * Deletes a global item by its ID.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} itemId - The ID of the item to be deleted.
 * @return {Promise<Document>} - A promise that resolves to the deleted item.
 */
export const deleteGlobalItemService = async (
  itemId: string,
): Promise<object> => {
  const itemClass = new Item();
  await itemClass.delete(itemId);

  Queue.getInstance().addTask(async () => {
    VectorClient.instance.delete(itemId);
  });

  return { message: 'Item deleted successfully' };
};
