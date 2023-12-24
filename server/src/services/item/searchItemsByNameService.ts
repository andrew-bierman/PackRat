// import { prisma } from '../../prisma';

import { PrismaClient } from '@prisma/client/edge';
import { Item } from '../../drizzle/methods/Item';

/**
 * Searches for items by name.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} name - The name to search for.
 * @param {string} packId - The pack to search in.
 * @return {Promise<Array>} An array of items that match the search criteria.
 */
export const searchItemsByNameService = async (
  name,
  packId,
) => {
  const itemClass = new Item();
  const items = await itemClass.findMany({
    where: (item, { has, ilike }) => ({
      ...(packId ? { [has]: item.packs, packId } : {}),
      [ilike]: item.name, name,
    }),
  });

  return items;
};
