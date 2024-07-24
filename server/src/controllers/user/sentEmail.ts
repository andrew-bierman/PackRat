import { publicProcedure } from '../../trpc';
import { resetEmail } from '../../utils/accountEmail';
import * as validator from '@packrat/validations';
import { User } from '../../drizzle/methods/User';
import { responseHandler } from '../../helpers/responseHandler';
import { type Context } from 'hono';

export const sentEmail = async (c: Context) => {
  try {
    const { email } = await c.req.json();
    console.log('email ', c.env.SEND_GRID_API_KEY);
    const STMP_EMAIL = c.env.STMP_EMAIL;
    const SEND_GRID_API_KEY = c.env.SEND_GRID_API_KEY;
    const JWT_SECRET = c.env.JWT_SECRET;
    const CLIENT_URL = c.env.CLIENT_URL;

    const userClass = new User();
    const user = await userClass.findUser({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const resetUrl = await userClass.generateResetToken(
      JWT_SECRET,
      CLIENT_URL,
      user.id,
    );
    await resetEmail(user.email, resetUrl, STMP_EMAIL, SEND_GRID_API_KEY);
    c.set('data', { message: 'Reset Token has been sent successfully' });
    return await responseHandler(c);
  } catch (error) {
    c.set('error', error.message);
    return await responseHandler(c);
  }
};

export function sentEmailRoute() {
  return publicProcedure.input(validator.sentEmail).mutation(async (opts) => {
    const { email } = opts.input;
    const { env }: any = opts.ctx;
    const STMP_EMAIL = env.STMP_EMAIL;
    const SEND_GRID_API_KEY = env.SEND_GRID_API_KEY;
    const JWT_SECRET = env.JWT_SECRET;
    const CLIENT_URL = env.CLIENT_URL;
    const userClass = new User();
    const user = await userClass.findUser({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const resetUrl = await userClass.generateResetToken(
      JWT_SECRET,
      CLIENT_URL,
      user.id,
    );
    await resetEmail(user.email, resetUrl, STMP_EMAIL, SEND_GRID_API_KEY);
    return 'Reset Token has been sent successfully';
  });
}
