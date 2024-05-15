import { User } from '../../drizzle/methods/User';
import { Pack } from '../../drizzle/methods/pack';

/**
 * Retrieves the favorite packs associated with a specific user.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} userId - The ID of the user.
 * @return {Promise<Array<Pack>>} An array of favorite packs.
 */
export const getUserFavoritesService = async (userId: string) => {
  const userClass = new User();
  const packClass = new Pack();
  const user = await userClass.findUser({ userId, includeFavorites: true });
  const userFavorites = user.userFavoritePacks?.map((item) => ({
    ...item.pack,
    scores: JSON.parse(item.pack.scores as string),
    grades: JSON.parse(item.pack.grades as string),
    total_weight: packClass.computeTotalWeight(item.pack),
    favorites_count: packClass.computeFavouritesCount(item.pack),
    total_score: packClass.computeTotalScores(item.pack),
  }));
  return userFavorites;
};
