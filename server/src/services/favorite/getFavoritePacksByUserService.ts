import { Pack } from '../../drizzle/methods/pack';

/**
 * Retrieves the favorite packs associated with a specific user.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} userId - The ID of the user.
 * @return {Promise<Array<Pack>>} An array of favorite packs.
 */
export const getFavoritePacksByUserService = async (
  userId,
) => {
  const packClass = new Pack();
  const packs = await packClass.findMany({
    where: {
      favorited_by: {
        has: userId,
      },
    },
  });

  return packs;
};
