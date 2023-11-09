import { prisma } from '../../prisma';
/**
 * Retrieves items based on the given pack ID.
 *
 * @param {string} packId - The ID of the pack.
 * @return {Promise<Array<Object>>} An array of items.
 */
export const getItemsService = async (packId) => {
  const items = await prisma.item.findMany({
    where: {
      packs: {
        some: {
          id: packId,
        },
      },
    },
  });

  return items;
};
