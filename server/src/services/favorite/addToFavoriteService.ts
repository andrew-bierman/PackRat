// import { prisma } from '../../prisma';

import { PrismaClient } from '@prisma/client/edge';

/**
 * Adds or removes a pack from the user's favorites list.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack.
 * @param {string} userId - The ID of the user.
 * @return {Promise<void>} A promise that resolves when the operation is complete.
 */
export const addToFavoriteService = async (
  prisma: PrismaClient,
  packId,
  userId,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      favoriteDocuments: true,
    },
  });

  if (user.favoriteDocuments.includes(packId)) {
    // If the pack is in the user's favorites, remove it.
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favoriteDocuments: {
          disconnect: {
            id: packId,
          },
        },
      },
    });

    await prisma.pack.update({
      where: {
        id: packId,
      },
      data: {
        favoritedByDocuments: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  } else {
    // If the pack is not in the user's favorites, add it.
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favoriteDocuments: {
          connect: {
            id: packId,
          },
        },
      },
    });

    await prisma.pack.update({
      where: {
        id: packId,
      },
      data: {
        favoritedByDocuments: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
};
