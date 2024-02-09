import User from '../../models/userModel';

/**
 * Retrieves a user by their ID from the database.
 * @param {string} token - The ID of the user.
 * @return {Promise<object>} The user object.
 */
export const getUserByTokenService = async (token: string): Promise<object> => {
  try {
    const user: any = await User.findOne({ token: token }).lean();

    return user;
  } catch (error) {
    throw new Error('User cannot be found');
  }
};
