import { prisma } from '../../prisma';

/**
 * Retrieves an item from the database by its ID.
 *
 * @param {string} id - The ID of the item to retrieve.
 * @return {Promise<Object>} The retrieved item.
 */
export const getItemByIdService = async (id) => {
  const item = await prisma.item.findUnique({
    where: {
      id: id,
    },
  });

  return item;
};
