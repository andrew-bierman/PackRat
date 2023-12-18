// import { prisma } from '../../prisma';

import { PrismaClient } from '@prisma/client/edge';

/**
 * Adds a global item to the pack service.
 *  @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack.
 * @param {string} itemId - The ID of the item.
 * @param {string} ownerId - The ID of the owner.
 * @return {Promise<object>} - A promise that resolves to the added item.
 */
export const addGlobalItemToPackService = async (
  prisma: PrismaClient,
  packId,
  itemId,
  ownerId,
) => {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
    include: { categoryDocument: { select: { name: true } } },
  });

  await prisma.pack.update({
    where: { id: packId },
    data: {
      itemDocuments: {
        connect: { id: itemId },
      },
    },
  });

  const uniqueOwners = [...new Set([...item.owners, ownerId])];

  const updatedItem = await prisma.item.update({
    where: { id: item.id },
    data: {
      owners: {
        set: uniqueOwners,
      },
      packDocuments: {
        connect: { id: packId },
      },
    },
  });

  return updatedItem;
};
