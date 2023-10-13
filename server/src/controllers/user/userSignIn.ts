import { publicProcedure } from '../../trpc';
import User from '../../models/userModel';
import * as validator from '../../middleware/validators/index';
/**
 * Sign in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The user object.
 */
export const userSignIn = async (c) => {
  const { email, password } = c.req.json();
  const user: any = await (User as any).findByCredentials({
    email,
    password,
  });
  await user.generateAuthToken();
  c.status(200).send({ user });
};

export function userSignInRoute() {
  return publicProcedure.input(validator.userSignIn).mutation(async (opts) => {
    const { input } = opts;
    const user: any = await (User as any).findByCredentials(input);
    await user.generateAuthToken();
    return user;
  });
}
