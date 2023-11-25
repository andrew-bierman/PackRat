// import { prisma } from '../../prisma';

import { PrismaClient } from '@prisma/client/edge';

/**
 * Searches for items by name.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} name - The name to search for.
 * @param {string} packId - The pack to search in.
 * @return {Promise<Array>} An array of items that match the search criteria.
 */
export const searchItemsByNameService = async (
  prisma: PrismaClient,
  name,
  packId,
) => {
  const items = await prisma.item.findMany({
    where: {
      ...(packId && {
        packs: {
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
