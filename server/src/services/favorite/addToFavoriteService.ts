import { prisma } from "../../prisma/index";
/**
 * Adds or removes a pack from the user's favorites list.
 *
 * @param {string} packId - The ID of the pack.
 * @param {string} userId - The ID of the user.
 * @return {Promise<void>} A promise that resolves when the operation is complete.
 */
export const addToFavoriteService = async (packId, userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user.favorites.includes(packId)) {
    // If the pack is in the user's favorites, remove it.
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favorites: {
          disconnect: {
            id: packId,
          } ,
        } as any,
      },
    });

    await prisma.pack.update({
      where: {
        id: packId,
      },
      data: {
        favorited_by: {
          disconnect: {
            id: userId,
          },
        } as any,
      },
    });
  } else {
    // If the pack is not in the user's favorites, add it.
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favorites: {
          connect: {
            id: packId,
          },
        } as any,
      },
    });

    await prisma.pack.update({
      where: {
        id: packId,
      },
      data: {
        favorited_by: {
          connect: {
            id: userId,
          },
        } as any,
      },
    });
  }
};
