// import { prisma } from '../../prisma';

import { Item } from '../../drizzle/methods/Item';

/**
 * Retrieves items based on the given pack ID.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack.
 * @return {Promise<Array<Object>>} An array of items.
 */
export const getItemsService = async (packId) => {
  const itemClass = new Item();
  const items = await itemClass.findMany({
    where: (item, { has }) => has(item.packs, packId),
  });
  return items;
};
