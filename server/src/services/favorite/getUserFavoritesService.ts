import { prisma } from '../../prisma';
import { UserNotFoundError } from '../../helpers/errors';

/**
 * Retrieves the favorite packs associated with a specific user.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<Array<Pack>>} An array of favorite packs.
 */
export const getUserFavoritesService = async (userId, next) => {
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
