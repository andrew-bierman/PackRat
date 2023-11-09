import { prisma } from '../../prisma';
/**
 * Searches for items by name.
 *
 * @param {string} name - The name to search for.
 * @return {Promise<Array>} An array of items that match the search criteria.
 */
export const searchItemsByNameService = async (name) => {
  const items = await prisma.item.findMany({
    where: {
      name: {
        contains: name, // Case-insensitive search for name
      },
    },
  });

  return items;
};
