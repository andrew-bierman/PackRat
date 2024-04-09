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
export const userSignup = async (req, res) => {
  const { email } = req.body;
  await (User as any).alreadyLogin(email);
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  const salt = await bcrypt.genSalt(parseInt(JWT_SECRET));
  req.body.password = await bcrypt.hash(req.body.password, salt);
  const user = new User(req.body);
  await user.save();
  await user.generateAuthToken();
  sendWelcomeEmail(user.email, user.name);
  res.status(201).send({ user });
};

export function signUpRoute() {
  return publicProcedure.input(validator.userSignUp).mutation(async (opts) => {
    const { email, password } = opts.input;
    await (User as any).alreadyLogin(email);
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const salt = await bcrypt.genSalt(parseInt(JWT_SECRET));
    opts.input.password = await bcrypt.hash(password, salt);
    const user = new User(opts.input);
    await user.save();
    await user.generateAuthToken();
    sendWelcomeEmail(user.email, user.name);
    return user;
  });
}
