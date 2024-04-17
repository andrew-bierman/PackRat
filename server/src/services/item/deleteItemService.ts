// import { prisma } from '../../prisma';

import { Item } from '../../drizzle/methods/Item';
import { ItemPacks } from '../../drizzle/methods/ItemPacks';

/**
 * Deletes an item from the database.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} itemId - The ID of the item to be deleted.
 * @param {string} packId - The ID of the pack that the item belongs to.
 * @return {Promise<object>} - The deleted item object.
 */
export const deleteItemService = async (
  itemId: string,
  packId: string,
): Promise<object> => {
  const ItemPacksClass = new ItemPacks();
  console.log(itemId);
  await ItemPacksClass.delete(itemId, packId);

  return { message: 'Item deleted successfully' };
};
