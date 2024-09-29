import { Feed } from '../../modules/feed/model';
import { User } from '../../drizzle/methods/User';

/**
 * Retrieves the favorite packs associated with a specific user.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} userId - The ID of the user.
 * @return {Promise<Array<Pack>>} An array of favorite packs.
 */
export const getUserFavoritesService = async (userId: string) => {
  const userClass = new User();
  const feedClass = new Feed();
  const user = (await userClass.findUser({
    userId,
    includeFavorites: true,
  })) as { userFavoritePacks?: any };

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  const userFavorites = await feedClass.findFeed(
    'Most Recent',
    {
      includeUserFavoritesOnly: true,
      ownerId: userId,
    },
    'trips',
  );
  return userFavorites;
};
