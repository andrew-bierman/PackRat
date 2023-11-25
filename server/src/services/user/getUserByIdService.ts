import { PrismaClient } from '@prisma/client/edge';
import { User } from '../../prisma/methods';
// import { prisma } from '../../prisma';

/**
 * Retrieves a user by their ID from the database.
 * @param {string} userId - The ID of the user.
 * @return {Promise<object>} The user object.
 */
export const getUserByIdService = async (
  prisma: PrismaClient,
  userId: string,
): Promise<object> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        favorites: true,
      },
    });

    if (user) {
      return User(user).toJSON(prisma);
    } else {
      throw new Error('User cannot be found');
    }
  } catch (error) {
    throw new Error('Server Error');
  }
};
