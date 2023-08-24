import User from '../../models/userModel'
import Pack from '../../models/packModel'

/**
 * Retrieves the favorites of a user.
 *
 * @param {string} userId - The ID of the user.
 * @return {Favorite[]} An array containing the user's favorite items.
 */
export const getUserFavoritesService = async (userId) => {
  const user = await User.findById({ _id: userId }).populate('favorites')

  if (!user) return null

  return user.favorites
}
