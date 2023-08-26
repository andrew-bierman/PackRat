import { UserNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { getUserByIdService } from '../../services/user/getUserByIdService';

/**
 * Retrieves a user by their ID from the database and returns the user object as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The user object as a JSON response.
 */
export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await getUserByIdService(userId);

    res.locals.data = user;
    responseHandler(res);
  } catch (error) {
    next(UserNotFoundError);
  }
};
