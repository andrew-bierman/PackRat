import { publicProcedure, protectedProcedure } from '../../trpc';
import { UserNotFoundError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { User } from '../../drizzle/methods/User';
import { Context, Next } from 'hono';
import { UserNotFoundError } from '../../helpers/errors';

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
// export const getUsers = async (req, res, next) => {
//   try {
//     const users = await prisma.user.findMany({
//       include: {
//         favorites: true,
//       },
//     });

//     res.locals.data = users;
//     responseHandler(res);
//   } catch (error) {
//     next(UserNotFoundError);
//   }
// };

export const getUsers = async (c: Context, next: Next) => {
  try {
    const userClass = new User();
    const users = await userClass.findMany();
    
    if (!users) {
      throw new UserNotFoundError();
    }

    c.res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    c.res.status(500).json({ error: 'Internal Server Error' });
  }
};

export function getUsersRoute() {
  return protectedProcedure.query(async (opts) => {
    const userClass = new User();
    const users = await userClass.findMany();
    return users;
  });
}
