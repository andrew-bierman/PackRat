// import { prisma } from '../../prisma';

import { Item } from '../../drizzle/methods/Item';
import { ItemPacks } from '../../drizzle/methods/ItemPacks';
import { ItemOwners } from '../../drizzle/methods/ItemOwners';
import { scorePackService } from '../pack/scorePackService';

/**
 * Adds a global item to the pack service.
 *  @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack.
 * @param {string} itemId - The ID of the item.
 * @param {string} ownerId - The ID of the owner.
 * @return {Promise<object>} - A promise that resolves to the added item.
 */
export const deleteItemFromPack = async (packId: string, itemId: string) => {
  const itemClass = new Item();
  const itemPacksClass = new ItemPacks();
  const item = await itemClass.findItem({
    id: itemId,
  });
  if (!item) {
    throw new Error('Item does not exist!');
  }
  await itemPacksClass.delete(itemId, packId);
};
