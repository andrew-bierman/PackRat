// import { prisma } from '../../prisma';

import { PrismaClient } from '@prisma/client/edge';

/**
 * Deletes an item from the database.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} itemId - The ID of the item to be deleted.
 * @param {string} packId - The ID of the pack that the item belongs to.
 * @return {Promise<object>} - The deleted item object.
 */
export const deleteItemService = async (
  prisma: PrismaClient,
  itemId,
  packId,
) => {
  let itemDeleted;

  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
  });

  if (item.global) {
    await prisma.pack.update({
      where: {
        id: packId,
      },
      data: {
        itemDocuments: {
          disconnect: { id: itemId },
        },
      },
    });

    await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        packDocuments: {
          disconnect: { id: packId },
        },
      },
    });
  }

  itemDeleted = await prisma.item.delete({
    where: {
      id: itemId,
    },
  });

  return itemDeleted;
};
