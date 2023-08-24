import User from '../../models/userModel'
import { findUserAndUpdate } from '../../services/user/user.service'

/**
 * Updates the password for a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} - A promise that resolves to nothing.
 */
export const updatePassword = async (req, res) => {
  const { email, password } = req.body

  try {
    const val = await findUserAndUpdate(email, password, 'password')
    if (val) {
      res.status(200).json({ message: 'success' })
    } else {
      res.status(200).json({ message: 'Unable to update password' })
    }
  } catch (error) {
    res.status(404).json({ message: 'Server Error' })
  }
}
