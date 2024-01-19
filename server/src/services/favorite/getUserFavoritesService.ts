import { User } from '../../drizzle/methods/User';

/**
 * Retrieves the favorite packs associated with a specific user.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} userId - The ID of the user.
 * @return {Promise<Array<Pack>>} An array of favorite packs.
 */
export const getUserFavoritesService = async (
  userId: string,
): Promise<string[]> => {
  const userClass = new User();
  const user = await userClass.findUser({ userId, includeFavorites: true });
  const userFavorites = user.userFavoritePacks?.map((pack) => pack.packId);
  return userFavorites;
};
