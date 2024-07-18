import { z } from 'zod';
import { publicProcedure } from '../../trpc';
import { hashPassword, verifyPasswordResetToken } from '../../utils/user';
import { User } from '../../drizzle/methods/User';

export const handlePasswordReset = async (c) => {
  try {
    const token = c.req.params.token;
    const { password } = await c.req.parseBody();
    const { env } = c;
    const userClass = new User();
    const email = await verifyPasswordResetToken(token, env.JWT_SECRET);
    const hashedPassword = await hashPassword(env.JWT_SECRET, password);
    const user = await userClass.findUser({ email });

    if (!user) {
      return { error: 'No user found with this email address' };
    }

    if (!user.passwordResetTokenExpiration) {
      return { error: 'Password reset token expiration is not defined' };
    }

    if (Date.now() > user.passwordResetTokenExpiration.getTime()) {
      return { error: 'Password reset token has expired' };
    }
    await userClass.update({
      id: user.id,
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetTokenExpiration: null,
    });

    return { message: 'Password reset successful' };
  } catch (error) {
    return { error: `Failed to reset password: ${error.message}` };
  }
};

export function handlePasswordResetRoute() {
  return publicProcedure
    .input(z.object({ token: z.string(), password: z.string() }))
    .mutation(async (opts) => {
      const { token, password } = opts.input;
      const { env }: any = opts.ctx;
      const userClass = new User();
      const email = await verifyPasswordResetToken(token, env.JWT_SECRET);
      const hashedPassword = await hashPassword(env.JWT_SECRET, password);
      const user = await userClass.findUser({ email });

      if (!user) {
        throw new Error('No user found with this email address');
      }

      if (!user.passwordResetTokenExpiration) {
        throw new Error('Password reset token expiration is not defined');
      }

      if (Date.now() > user.passwordResetTokenExpiration.getTime()) {
        return { error: 'Password reset token has expired' };
      }
      await userClass.update({
        id: user.id,
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetTokenExpiration: null,
      });

      return { message: 'Password reset successful' };
    });
}
