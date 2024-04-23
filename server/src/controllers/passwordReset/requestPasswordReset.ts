import { publicProcedure } from '../../trpc';
import { z } from 'zod';
import { resetEmail } from '../../utils/accountEmail';
import { User } from '../../drizzle/methods/User';

/**
 * Sends a password reset email to the user and updates the user's password reset token.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @return {Object} The HTTP response object with a success message or an error message.
 */

export function requestPasswordResetEmailAndTokenRoute() {
  return publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async (opts) => {
      const { email } = opts.input;
      const { env }: any = opts.ctx;
      const userClass = new User();
      const jwtSecret = env.JWT_SECRET;
      const clientUrl = env.CLIENT_URL;
      const user = await userClass.findUser({ email });

      if (!user) {
        return { error: 'No user found with this email address' };
      }
      const resetUrl = await userClass.generateResetToken(
        jwtSecret,
        clientUrl,
        user.id,
      );
      await resetEmail(email, resetUrl, env.STMP_EMAIL, env.SEND_GRID_API_KEY);
      return { message: 'Password reset email sent successfully' };
    });
}
