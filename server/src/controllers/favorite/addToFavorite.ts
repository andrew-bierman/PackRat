import User from '../../models/userModel'
import Pack from '../../models/packModel'
import { addToFavoriteService } from '../../services/favorite/favorite.service'

/**
 * Adds or removes a pack from a user's favorites list and updates the corresponding pack's favorited_by and favorites_count fields.
 * @param {Object} req - The request object containing the packId and userId properties in the body.
 * @param {Object} res - The response object used to send the HTTP response.
 * @return {Object} The updated user object in the response body.
 */
export const addToFavorite = async (req, res) => {
  try {
    const { packId, userId } = req.body

    await addToFavoriteService(packId, userId)

    const user = await User.findOne({ _id: userId }).select('-password')

    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
