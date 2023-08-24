import User from '../../models/userModel'

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
        populate: {
          path: 'items',
          model: 'Item' // replace 'Item' with your actual Item model name
        }
      })
      .populate('favorites')
      .populate('trips')

    return user
  } catch (error) {
    throw new Error('User cannot be found')
  }
}
