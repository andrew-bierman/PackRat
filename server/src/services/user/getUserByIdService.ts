import { User } from '../../drizzle/methods/User';
// import { prisma } from '../../prisma';

/**
 * Retrieves a user by their ID from the database.
 * @param {string} userId - The ID of the user.
 * @return {Promise<object>} The user object.
 */
export const getUserByIdService = async (userId: string) => {
  try {
    const userClass = new User();
    const user = await userClass.findUser({ userId });
    return user;
  } catch (error) {
    throw new Error(error.toString());
  }
};
