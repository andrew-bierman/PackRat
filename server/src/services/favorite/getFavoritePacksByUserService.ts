import { Pack } from '../../drizzle/methods/pack';
import { DEFAULT_SORT } from '../../utils/pack';

/**
 * Retrieves the favorite packs associated with a specific user.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} userId - The ID of the user.
 * @return {Promise<Array<Pack>>} An array of favorite packs.
 */
export const getFavoritePacksByUserService = async (userId: string) => {
  const packClass = new Pack();
  const packs = await packClass.findMany({
    includeRelated: true,
    sortOption: DEFAULT_SORT,
  });
  const favoritePacks = packs?.filter(
    (pack: any) => pack.userFavoritePacks[0]?.userId === userId,
  );
  return favoritePacks;
};
