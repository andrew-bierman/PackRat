import { PrismaClient } from '@prisma/client/edge';

/**
 * Adds or removes a pack from a user's favorites list.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack.
 * @param {string} userId - The ID of the user.
 * @return {Promise<object>} The updated user object.
 */
export const addToFavoriteService = async (
  prisma: PrismaClient,
  packId: string,
  userId: string,
): Promise<object> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, favoriteDocuments: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isFavorite = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        favoriteDocuments: {
          where: {
            id: packId,
          },
        },
      },
    });

    if (isFavorite) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          favoriteDocuments: {
            disconnect: { id: packId },
          },
        },
      });

      await prisma.pack.update({
        where: { id: packId },
        data: {
          favoritedByDocuments: {
            disconnect: { id: userId },
          },
        },
      });
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: {
          favoriteDocuments: {
            connect: { id: packId },
          },
        },
      });

      await prisma.pack.update({
        where: { id: packId },
        data: {
          favoritedByDocuments: {
            connect: { id: userId },
          },
        },
      });
    }

    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
      },
    });

    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    console.log('done');
  }
};
