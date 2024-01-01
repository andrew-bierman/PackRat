import { User } from '../../drizzle/methods/User';
// import { prisma } from '../../prisma';

/**
 * Retrieves a user by their ID from the database.
 * @param {string} userId - The ID of the user.
 * @return {Promise<object>} The user object.
 */
export const getUserByIdService = async (
  userId: string,
): Promise<object> => {
  try {
    const user = new User();
    const userDoc = await user.findById(userId);

    if (userDoc) {
      return userDoc
    } else {
      throw new Error('User cannot be found');
    }
  } catch (error) {
    throw new Error('Server Error');
  }
};
