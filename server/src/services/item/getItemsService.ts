// import { prisma } from '../../prisma';

import { Item } from '../../drizzle/methods/Item';

/**
 * Retrieves items based on the given pack ID.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack.
 * @return {Promise<Array<Object>>} An array of items.
 */
export const getItemsService = async (packId?: string): Promise<object[]> => {
  const itemClass = new Item();
  const items = await itemClass.findMany();
  if (packId) {
    const filteredItems = items.filter(
      (item: any) => item.itemPacks[0]?.packId === packId,
    );
    console.log(filteredItems);
    return filteredItems;
  }
  return items;
};
