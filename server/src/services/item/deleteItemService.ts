// import { prisma } from '../../prisma';

import { Item } from '../../drizzle/methods/Item';
import { Pack } from '../../drizzle/methods/Pack';
import { ItemPacks } from '../../drizzle/methods/ItemPacks';

/**
 * Deletes an item from the database.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} itemId - The ID of the item to be deleted.
 * @param {string} packId - The ID of the pack that the item belongs to.
 * @return {Promise<object>} - The deleted item object.
 */
export const deleteItemService = async (itemId, packId) => {
  let itemDeleted;
  const itemClass = new Item();
  const ItemPacksClass: any = new ItemPacks();
  const pack = new Pack();
  const item = await itemClass.findUniqueItem({
    where: {
      id: itemId,
    },
  });

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
    itemDeleted = await ItemPacksClass.delete(itemId, packId);
  }

  // itemDeleted = await itemClass.delete(itemId);

  return itemDeleted;
};
