import { addToFavoriteService } from '../../services/favorite/addToFavoriteService'

/**
 * Adds or removes a pack from a user's favorites list.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated user object.
 */
export const addToFavorite = async (req, res) => {
  try {
    const { packId, userId } = req.body

    const user = await addToFavoriteService(packId, userId)

    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
}
