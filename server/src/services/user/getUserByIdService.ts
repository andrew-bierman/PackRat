import User from '../../models/userModel';

/**
 * Retrieves a user by their ID from the database.
 * @param {string} userId - The ID of the user.
 * @return {Promise<object>} The user object.
 */
export const getUserByIdService = async (userId: string): Promise<object> => {
  try {
    const user: any = await User.findById({ _id: userId })
      .populate({
        path: 'packs',
        select: 'name items',
      })
      .populate('favorites')
      .populate('trips')
      .lean();

    return user;
  } catch (error) {
    throw new Error('User cannot be found');
  }
};
