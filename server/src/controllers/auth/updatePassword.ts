import { protectedProcedure } from '../../trpc';
import { findUserAndUpdate } from '../../services/user/user.service';
import * as validator from '@packrat/validations';
import { hashPassword } from '../../utils/user';
import { type Context } from 'hono';

export const updatePassword = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const JWT_SECRET = c.env.JWT_SECRET;
    const hashedPassword = await hashPassword(JWT_SECRET, password);
    const user = await findUserAndUpdate(email, hashedPassword, 'password');
    return c.json({ user }, 200);
  } catch (error) {
    return c.json({ error: `Email Doesnt Exist: ${error.message}` }, 404);
  }
};

export function updatePasswordRoute() {
  return protectedProcedure
    .input(validator.updatePassword)
    .mutation(async (opts) => {
      const { email, password } = opts.input;
      const { env }: any = opts.ctx;
      const JWT_SECRET = env.JWT_SECRET;
      const hashedPassword = await hashPassword(JWT_SECRET, password);
      const user = await findUserAndUpdate(email, hashedPassword, 'password');
      return user;
    });
}
