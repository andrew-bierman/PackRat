import { publicProcedure, protectedProcedure } from '../../trpc';
import { UserNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { User } from '../../drizzle/methods/User';
import { Context, Next } from 'hono';

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
// Adjust the getUsers function to be compatible with Hono
export const getUsers = async (c) => {
  try {
    const userClass = new User();
    const users = await userClass.findMany();
    if (!c.locals) c.locals = {};
    c.locals.data = users;
    return responseHandler(c);
  } catch (error) {
    return c.json({ error: `Failed to get users: ${error.message}` }, 500);
  }
};

export function getUsersRoute() {
  return protectedProcedure.query(async (opts) => {
    const userClass = new User();
    const users = await userClass.findMany();
    return users;
  });
}
