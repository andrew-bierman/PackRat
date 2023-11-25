// import { prisma } from '../../prisma';

import { PrismaClient } from '@prisma/client/edge';

/**
 * Deletes a global item by its ID.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} itemId - The ID of the item to be deleted.
 * @return {Promise<Document>} - A promise that resolves to the deleted item.
 */
export const deleteGlobalItemService = async (prisma: PrismaClient, itemId) => {
  const itemDeleted = await prisma.item.delete({
    where: {
      id: itemId,
    },
  });

  return itemDeleted;
};
