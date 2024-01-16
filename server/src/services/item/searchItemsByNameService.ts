// import { prisma } from '../../prisma';

import { Item } from '../../drizzle/methods/Item';
import { type Item as IItem } from '../../db/schema';

/**
 * Searches for items by name.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} name - The name to search for.
 * @param {string} packId - The pack to search in.
 * @return {Promise<Array>} An array of items that match the search criteria.
 */
export const searchItemsByNameService = async (
  name: string,
): Promise<IItem[]> => {
  const itemClass = new Item();
  const items = await itemClass.findItemsByName(name);
  return items;
};
