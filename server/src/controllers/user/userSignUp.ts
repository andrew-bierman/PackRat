import User from '../../models/userModel';
import bcrypt from 'bcrypt';
import { sendWelcomeEmail, resetEmail } from '../../utils/accountEmail';
import { JWT_SECRET } from '../../config';
import { publicProcedure } from '../../trpc';
import * as validator from '../../middleware/validators/index';
/**
 * Sign up a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The promise that resolves when the user is signed up.
 */
export const userSignup = async (c) => {
  const { email } = c.req.json();
  await (User as any).alreadyLogin(email);
  const salt = await bcrypt.genSalt(parseInt(JWT_SECRET));
  c.req.json().password = await bcrypt.hash(c.req.json().password, salt);
  const user = new User(c.req.json());
  await user.save();
  await user.generateAuthToken();
  sendWelcomeEmail(user.email, user.name);
  c.status(201).send({ user });
};

export function signUpRoute() {
  return publicProcedure.input(validator.userSignUp).mutation(async (opts) => {
    let { email, password } = opts.input;
    await (User as any).alreadyLogin(email);
    const salt = await bcrypt.genSalt(parseInt(JWT_SECRET));
    password = await bcrypt.hash(password, salt);
    const user = new User(opts.input);
    await user.save();
    await user.generateAuthToken();
    sendWelcomeEmail(user.email, user.name);
    return user;
  });
}
