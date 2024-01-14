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
  packId?: string,
): Promise<object> => {
  const itemClass = new Item();
  const ItemPacksClass = new ItemPacks();
  const item = await itemClass.findItem({ id: itemId });
  if (item.global) {
    // update here
    // await pack.update({
    //   where: {
    //     id: packId,
    //   },
    //   data: {
    //     itemDocuments: {
    //       disconnect: { id: itemId },
    //     },
    //   },
    // });
    // update here
    // await item.update({
    //   where: {
    //     id: itemId,
    //   },
    //   data: {
    //     packDocuments: {
    //       disconnect: { id: packId },
    //     },
    //   },
    // });
    await ItemPacksClass.delete(itemId, packId);
  }

  await itemClass.delete(itemId);
  return { message: 'Item deleted successfully' };
};
