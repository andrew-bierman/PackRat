import { getUserByIdService } from '../../services/user/getUserByIdService';

/**
 * Retrieves a user by their ID from the database and returns the user object as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The user object as a JSON response.
 */
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await getUserByIdService(userId);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: 'User cannot be found' });
  }
};
