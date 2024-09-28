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
export const addGlobalItemToPackService = async (
  packId: string,
  itemId: string,
  ownerId: string,
) => {
  const itemClass = new Item();
  const itemPacksClass = new ItemPacks();
  const item = await itemClass.findItem({
    id: itemId,
    isGlobal: true,
  });
  if (!item) {
    throw new Error('Global Item does not exist!');
  }
  const { id, ...duplicatedItemValues } = item;
  const newItem = await itemClass.create(
    {
      ...duplicatedItemValues,
      global: false,
      ownerId,
    },
    packId,
  );

  return newItem;
};
