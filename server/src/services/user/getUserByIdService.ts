import { prisma } from '../../prisma/index';

/**
 * Retrieves a user by their ID from the database.
 * @param {string} userId - The ID of the user.
 * @return {Promise<object>} The user object.
 */
export const getUserByIdService = async (userId: string): Promise<object> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        favorites: true,
      },
    } as any);

    if (user) {
      return user;
    } else {
      throw new Error('User cannot be found');
    }
  } catch (error) {
    throw new Error('Server Error');
  }
};
