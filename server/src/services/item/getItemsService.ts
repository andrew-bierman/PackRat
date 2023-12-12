// import { prisma } from '../../prisma';

import { PrismaClient } from '@prisma/client/edge';

/**
 * Retrieves items based on the given pack ID.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack.
 * @return {Promise<Array<Object>>} An array of items.
 */
export const getItemsService = async (prisma: PrismaClient, packId) => {
  const items = await prisma.item.findMany({
    where: {
      packs: {
        has: packId,
      },
    },
  });

  return items;
};
