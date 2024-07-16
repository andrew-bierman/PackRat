import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { User } from '../../drizzle/methods/User';
import { hashPassword } from '../../utils/user';
/**
 * Resets the user's password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A promise that resolves when the password is successfully reset.
 */

export const resetPassword = async (c) => {
  try {
    const { resetToken, password } = await c.req.parseBody();
    const JWT_SECRET = c.env.JWT_SECRET;
    const userClass = new User();
    const user = await userClass.validateResetToken(resetToken, JWT_SECRET);
    if (!user) {
      throw new Error('Invalid reset token');
    }
    const hashedPassword = await hashPassword(JWT_SECRET, password);
    await userClass.update({ id: user.id, password: hashedPassword });
    return c.json({ message: 'Successfully reset password' }, 200);
  } catch (error) {
    return c.json({ error: `Failed to reset password: ${error.message}` }, 500);
  }
};

export function resetPasswordRoute() {
  return publicProcedure
    .input(validator.resetPassword)
    .mutation(async (opts) => {
      const { resetToken, password } = opts.input;
      const { env } = opts.ctx;
      const JWT_SECRET = env.JWT_SECRET;
      const userClass = new User();
      const user = await userClass.validateResetToken(resetToken, JWT_SECRET);
      if (!user) {
        throw new Error('Invalid reset token');
      }
      const hashedPassword = await hashPassword(JWT_SECRET, password);
      await userClass.update({ id: user.id, password: hashedPassword });
      return 'Successfully reset password';
    });
}
