// import { prisma } from '../../prisma';

import { User } from '../../drizzle/methods/User';
import { UserFavoritePacks } from '../../drizzle/methods/UserFavoritePacks';

/**
 * Adds or removes a pack from the user's favorites list.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack.
 * @param {string} userId - The ID of the user.
 * @return {Promise<void>} A promise that resolves when the operation is complete.
 */
export const addToFavoriteService = async (packId: string, userId: string) => {
  const userClass = new User();
  const userFavoritePacksClass = new UserFavoritePacks();
  const user = (await userClass.findUser({
    userId,
    includeFavorites: true,
  })) as { userFavoritePacks?: any };
  const packExists = user.userFavoritePacks?.find(
    (pack: any) => pack.packId === packId,
  );
  if (packExists) {
    // If the pack is in the user's favorites, remove it.
    // TODO
    // await user.update({
    //   where: {
    //     id: userId,
    //   },
    //   data: {
    //     favoriteDocuments: {
    //       disconnect: {
    //         id: packId,
    //       },
    //     },
    //   },
    // });
    // await prisma.pack.update({
    //   where: {
    //     id: packId,
    //   },
    //   data: {
    //     favoritedByDocuments: {
    //       disconnect: {
    //         id: userId,
    //       },
    //     },
    //   },
    // });
    await userFavoritePacksClass.delete(userId, packId);
    return {
      message: "Successfully removed the pack from the user's favorites list",
    };
  } else {
    // If the pack is not in the user's favorites, add it.
    // await userClass.update(
    //   {
    //     favoriteDocuments: packId,
    //   },
    //   userId,
    // );

    // await packClass.update(
    //   {
    //     favoritedByDocuments: userId,
    //   },
    //   packId,
    // );
    await userFavoritePacksClass.create(userId, packId);
    return { message: 'Successfully added the pack' };
  }
};
