import { publicProcedure } from '../../trpc';
import { UserNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import User from '../../models/userModel';

// Middleware to check if user is authenticated
// export const isAuthenticated = async (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1];
//   try {
//     const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
//     req.userData = decodedToken;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Unauthorized" });
//   }
// };

/**
 * Get all users from the database and send a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} The JSON response containing the users.
 */
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).populate('packs trips');

    res.locals.data = users;
    responseHandler(res);
  } catch (error) {
    next(UserNotFoundError);
  }
};

export function getUsersRoute() {
  return publicProcedure.query(async (input) => {
    const users = await User.find({}).populate('packs trips');
    return users;
  })
}