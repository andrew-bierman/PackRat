import { publicProcedure } from '../../trpc';
import * as validator from '../../middleware/validators/index';
import {findByCredentials, generateAuthToken} from "../../utils/prismaHelpers/user"
/**
 * Sign in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The user object.
 */
export const userSignIn = async (req, res) => {
  const { email, password } = req.body;
  const user: any = await findByCredentials({
    email,
    password,
  });
  await generateAuthToken(user);
  res.status(200).send({ user });
};

export function userSignInRoute() {
  return publicProcedure.input(validator.userSignIn).mutation(async (opts) => {
    const { input }:any = opts;
    const user: any = await findByCredentials(input);
    await generateAuthToken(user);
    return user;
  });
}
