import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '../../utils/accountEmail';
import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { User } from '../../drizzle/methods/User';
import { hashPassword } from '../../utils/user';

export const userSignup = async (c) => {
  try {
    let { email, password, name, username } = await c.req.json();
    const userClass = new User();
    const userExists = await userClass.findUser({ email });
    if (userExists) {
      throw new Error('Email already registered');
    }

    const STMP_EMAIL = c.env.STMP_EMAIL;
    const SEND_GRID_API_KEY = c.env.SEND_GRID_API_KEY;
    const JWT_SECRET = c.env.JWT_SECRET;
    password = await hashPassword(JWT_SECRET, password);
    const user = await userClass.create({
      email,
      username,
      password,
      name,
    });

    await userClass.generateAuthToken(JWT_SECRET, user.id);
    await sendWelcomeEmail(
      user.email,
      user.name,
      STMP_EMAIL,
      SEND_GRID_API_KEY,
    );
    return c.json({ user }, 201);
  } catch (error) {
    return c.json({ error: `Failed to sign up: ${error.message}` }, 500);
  }
};

export function signUpRoute() {
  return publicProcedure.input(validator.userSignUp).mutation(async (opts) => {
    let { email, password, name, username } = opts.input;
    const { env }: any = opts.ctx;
    const userClass = new User();
    const userExists = await userClass.findUser({ email });
    if (userExists) {
      throw new Error('Email already registered');
    }
    const STMP_EMAIL = env.STMP_EMAIL;
    const SEND_GRID_API_KEY = env.SEND_GRID_API_KEY;
    const JWT_SECRET = env.JWT_SECRET;
    password = await hashPassword(JWT_SECRET, password);
    const user = await userClass.create({
      email,
      username,
      password,
      name,
    });
    await sendWelcomeEmail(
      user.email,
      user.name,
      STMP_EMAIL,
      SEND_GRID_API_KEY,
    );
    return user;
  });
}
