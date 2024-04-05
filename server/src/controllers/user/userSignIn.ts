import { publicProcedure } from '../../trpc';
import * as validator from '../../middleware/validators/index';
import { User } from '../../drizzle/methods/User';

// /**
//  * Sign in a user.
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  * @return {Object} The user object.
//  */
// export const userSignIn = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await prisma.user.findByCredentials({
//     email,
//     password,
//   });
//   await User(user).generateAuthToken();
//   res.status(200).send({ user });
// };

export function userSignInRoute() {
  return publicProcedure.input(validator.userSignIn).mutation(async (opts) => {
    const { input } = opts;
    const { env } = opts.ctx;
    const userClass = new User();
    const user = await userClass.findByCredentials(input.email, input.password);
    await userClass.generateAuthToken(env.JWT_SECRET, user.id);
    return user;
  });
}
