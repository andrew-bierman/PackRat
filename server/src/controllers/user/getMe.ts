import { getUserByTokenService } from '../../services/user/getUserByToken';
import { protectedProcedure } from '../../trpc';

/**
 * Retrieves the user information and sends it as a response.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The user information.
 */
// export const getMe = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     const token = authHeader.split(' ')[1];
//     const user = await getUserByTokenService(token);
//     res.status(200).send(user);
//   } catch (err) {
//     res.status(401).send({ message: err.message });
//   }
// };

export function getMeRoute() {
  return protectedProcedure.query(async (opts) => {
    const { user } = opts.ctx;
    return user;
  });
}
