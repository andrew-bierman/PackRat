import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { User } from '../../drizzle/methods/User';
import { Context, Next } from 'hono';

// /**
//  * Sign in a user.
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  * @return {Object} The user object.
//  */
// export const userSignIn = async (c: Context, next: Next) => {
//   const { email, password } = await c.req.json();
//   const user = await prisma.user.findByCredentials({
//     email,
//     password,
//   });
//   await User(user).generateAuthToken();
//   c.json(user, 200);
// };

export const userSignIn = async (c: Context, next: Next) => {
  try {
    const { email, password } = await c.req.json();
    const userClass = new User();
    console.log('DONEDONEDNEOFNDSOFJSD')
    const user = await userClass.findByCredentials(email, password);

    if (!user) {
      throw new Error('User not found');
    }

    await userClass.generateAuthToken(c.env.JWT_SECRET, user.id);

    c.json(user, 200);
  } catch (error) {
    console.error('Error signing in user:', error);
    c.json({ error: 'Internal Server Error' }, 500);
  }
};

export function userSignInRoute() {
  return publicProcedure.input(validator.userSignIn).mutation(async (opts) => {
    const { input } = opts;
    const { env } = opts.ctx;
    const userClass = new User();
    const user = await userClass.findByCredentials(input.email, input.password);
    if (!user) {
      throw new Error('User not found');
    }
    await userClass.generateAuthToken(env.JWT_SECRET, user.id);
    return user;
  });
}
