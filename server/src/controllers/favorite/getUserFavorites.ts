import User from '../../models/userModel'
import { getUserFavoritesService } from '../../services/favorite/favorite.service'

/**
 * Retrieves the favorite items of a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} An array of favorite items belonging to the user.
 */
export const getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.params

    const favorites = await getUserFavoritesService(userId)

    if (!favorites) throw new Error('User favorites not found')

    res.status(200).json(favorites)
  } catch (error) {
    res.status(404).json({ msg: 'User favorites cannot be found' })
  }
}
