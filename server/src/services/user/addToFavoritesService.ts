import { prisma } from "../../prisma/index";
/**
 * Adds or removes a pack from a user's favorites list.
 * @param {string} packId - The ID of the pack.
 * @param {string} userId - The ID of the user.
 * @return {Promise<object>} The updated user object.
 */
export const addToFavoriteService = async (
  packId: string,
  userId: string,
): Promise<object> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, favorites: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isFavorite = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        favorites: {
          where: {
            packId, 
          },
        },
      },
    } as any);
 
    if (isFavorite) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          favorites: {
            disconnect: { id: packId },
          },
        },
      } as any);

      await prisma.pack.update({
        where: { id: packId },
        data: {
          favorited_by: {
            disconnect: { id: userId },
          },
        },
      } as any);
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: {
          favorites: {
            connect: { id: packId },
          },
        },
      } as any);

      await prisma.pack.update({
        where: { id: packId },
        data: {
          favorited_by: {
            connect: { id: userId },
          },
        },
      }as any);
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
console.log("done")
  }
};
