import { publicProcedure, protectedProcedure } from '../../trpc';
import { findUserAndUpdate } from '../../services/user/user.service';
import * as validator from '@packrat/validations';
import { hashPassword } from '../../utils/user';
// import { prisma } from '../../prisma';

/**
 * Updates the password for a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} - A promise that resolves to nothing.
 */
export const updatePassword = async (c) => {
  try {
    const { email, password } = await c.req.parseBody();
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
