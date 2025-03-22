import { User } from '../../drizzle/methods/User';

/**
 * Retrieves a user by their ID from the database.
 * @param {string} token - The ID of the user.
 * @return {Promise<object>} The user object.
 */
export const getUserByTokenService = async (token: string): Promise<object> => {
  try {
    const userInstance = new User();
    const user: any = await userInstance.findUnique({ where: { token } });

    return user;
  } catch (error) {
    throw new Error('User cannot be found');
  }
};
