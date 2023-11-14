import { prisma } from "../../prisma/index";

/**
 * Retrieves an item from the database by its ID.
 *
 * @param {string} _id - The ID of the item to retrieve.
 * @return {Promise<Object>} The retrieved item.
 */
export const getItemByIdService = async (_id) => {
  const item = await prisma.item.findUnique({
    where: {
      id: _id,
    },
  });

  return item;
};
