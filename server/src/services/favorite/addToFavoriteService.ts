// import { prisma } from '../../prisma';

import { PrismaClient } from '@prisma/client/edge';
import { User } from '../../drizzle/methods/User';
import { Pack } from '../../drizzle/methods/Pack';

/**
 * Adds or removes a pack from the user's favorites list.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} packId - The ID of the pack.
 * @param {string} userId - The ID of the user.
 * @return {Promise<void>} A promise that resolves when the operation is complete.
 */
export const addToFavoriteService = async (
  packId,
  userId,
) => {
  const userClass = new User();
  const packClass = new Pack();
  const user = await userClass.findUnique({
    where: (users, { eq }) => eq(users.id, userId),
    with: {
      favoriteDocuments: true
    }
  });

  if (user.favoriteDocuments.includes(packId)) {
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
  } else {
    // If the pack is not in the user's favorites, add it.
    await userClass.update({
      favoriteDocuments: packId,
    }, userId);

    await packClass.update({
      favoritedByDocuments: userId
    }, packId);
  }
};
