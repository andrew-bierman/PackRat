import { prisma } from '../../prisma';
/**
 * Searches for items by name.
 *
 * @param {string} name - The name to search for.
 * @param {string} packId - The pack to search in.
 * @return {Promise<Array>} An array of items that match the search criteria.
 */
export const searchItemsByNameService = async (name, packId) => {
  const items = await prisma.item.findMany({
    where: {
      ...(packId && {
        pack_ids: {
          has: packId,
        },
      }),
      name: {
        contains: name, // Case-insensitive search for name
      },
    },
  });

  return items;
};
