import { UserNotFoundError } from '../../helpers/errors';
import { PrismaClient } from '@prisma/client/edge';

/**
 * Retrieves the favorite packs associated with a specific user.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} userId - The ID of the user.
 * @return {Promise<Array<Pack>>} An array of favorite packs.
 */
export const getUserFavoritesService = async (
  prisma: PrismaClient,
  userId,
  next,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      favorites: true,
    },
  });

  if (!user) {
    next(UserNotFoundError);
  }

  return user.favorites;
};
