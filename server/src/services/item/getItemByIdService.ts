// import { prisma } from '../../prisma';

import { PrismaClient } from '@prisma/client/edge';

/**
 * Retrieves an item from the database by its ID.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} id - The ID of the item to retrieve.
 * @return {Promise<Object>} The retrieved item.
 */
export const getItemByIdService = async (prisma: PrismaClient, id) => {
  const item = await prisma.item.findUnique({
    where: {
      id: id,
    },
  });

  return item;
};
