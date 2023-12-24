import { User } from '../../drizzle/methods/User';
import { UserNotFoundError } from '../../helpers/errors';

/**
 * Retrieves the favorite packs associated with a specific user.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} userId - The ID of the user.
 * @return {Promise<Array<Pack>>} An array of favorite packs.
 */
export const getUserFavoritesService = async (
  userId,
  next,
) => {
  const userClass = new User();
  const user = await userClass.findUnique({
    where: {
      id: userId,
    },
    with: {
      favorites: true,
    },
  });

  if (!user) {
    next(UserNotFoundError);
  }

  return user.favorites;
};
