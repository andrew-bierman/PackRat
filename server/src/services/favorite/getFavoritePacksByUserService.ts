import { PrismaClient } from '@prisma/client/edge';

/**
 * Retrieves the favorite packs associated with a specific user.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {string} userId - The ID of the user.
 * @return {Promise<Array<Pack>>} An array of favorite packs.
 */
export const getFavoritePacksByUserService = async (
  prisma: PrismaClient,
  userId,
) => {
  const packs = await prisma.pack.findMany({
    where: {
      favorited_by: {
        has: userId,
      },
    },
  });

  return packs;
};
