import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { User } from '../../drizzle/methods/User';

export const userSignIn = async (c) => {
  try {
    const { email, password } = await c.req.json();
    const userClass = new User();
    const user = await userClass.findByCredentials(email, password);
    if (!user) {
      throw new Error('Wrong email or password');
    }
    await userClass.generateAccessToken(c.env.JWT_SECRET, user.id);
    return c.json({ user }, 200);
  } catch (error) {
    return c.json({ error: `Failed to sign in: ${error.message}` }, 500);
  }
};

export function userSignInRoute() {
  return publicProcedure.input(validator.userSignIn).mutation(async (opts) => {
    const { input } = opts;
    const { env } = opts.ctx;
    const userClass = new User();
    const user = await userClass.findByCredentials(input.email, input.password);
    if (!user) {
      throw new Error('Wrong email or password');
    }

    const accessToken = await userClass.generateAccessToken(
      env.JWT_SECRET,
      user.id,
    );
    const refreshToken = await userClass.generateRefreshToken(
      env.REFRESH_TOKEN_SECRET,
      user.id,
    );

    const { password, ...userResponse } = user;

    return { accessToken, refreshToken, user: userResponse };
  });
}
