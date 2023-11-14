import { prisma } from "../../prisma/index";

/**
 * Retrieves the favorite packs associated with a specific user.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<Array<Pack>>} An array of favorite packs.
 */
export const getFavoritePacksByUserService = async (userId) => {
  const packs = await prisma.pack.findMany({
    where: {
      favorited_by: {
        some: {
          id: userId,
        } ,
      } as any,
    },
  });

  return packs;
};
