import { Feed } from '../../modules/feed/model';
import { User } from '../../drizzle/methods/User';
import { PaginationParams } from '../../helpers/pagination';

/**
 * Retrieves the favorite packs associated with a specific user.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} userId - The ID of the user.
 * @return {Promise<Array<Pack>>} An array of favorite packs.
 */
export const getUserFavoritesService = async (
  userId: string,
  options?: { searchTerm?: string; isPublic?: boolean },
  pagination?: PaginationParams,
) => {
  const { searchTerm, isPublic } = options || {};
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
      searchTerm,
      isPublic,
      ownerId: userId,
    },
    'trips',
    pagination,
  );
  return userFavorites;
};
