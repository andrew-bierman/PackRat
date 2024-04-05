import { User } from '../../drizzle/methods/User';
import { UserFavoritePacks } from '../../drizzle/methods/UserFavoritePacks';

/**
 * Adds or removes a pack from a user's favorites list.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack.
 * @param {string} userId - The ID of the user.
 * @return {Promise<object>} The updated user object.
 */

type UserType = MongooseDocument & IUser & { _id: ObjectId };

export const addToFavoriteService = async (
  packId: string,
  userId: string,
): Promise<object> => {
  const userFavoritePacksClass = new UserFavoritePacks();
  try {
    const userClass = new User();
    const user = await userClass.findUnique({
      where: { id: userId },
      with: { id: true, favoriteDocuments: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isFavorite = await userClass.findFavorite(userId, packId);

    if (isFavorite) {
      // await prisma.user.update({
      //   where: { id: userId },
      //   data: {
      //     favoriteDocuments: {
      //       disconnect: { id: packId },
      //     },
      //   },
      // });

      // await prisma.pack.update({
      //   where: { id: packId },
      //   data: {
      //     favoritedByDocuments: {
      //       disconnect: { id: userId },
      //     },
      //   },
      // });
      await userFavoritePacksClass.delete(userId, packId);
    } else {
      // await prisma.user.update({
      //   where: { id: userId },
      //   data: {
      //     favoriteDocuments: {
      //       connect: { id: packId },
      //     },
      //   },
      // });

      // await prisma.pack.update({
      //   where: { id: packId },
      //   data: {
      //     favoritedByDocuments: {
      //       connect: { id: userId },
      //     },
      //   },
      // });
      await userFavoritePacksClass.create(userId, packId);
    }

    const updatedUser = await userClass.findUnique({
      where: { id: userId },
      with: {
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
