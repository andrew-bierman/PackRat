import { publicProcedure } from '../../trpc';
import { z } from 'zod';
import { resetEmail } from '../../utils/accountEmail';
import { User } from '../../drizzle/methods/User';

export const requestPasswordResetEmailAndToken = async (c) => {
  try {
    const { email } = await c.req.parseBody();
    const userClass = new User();
    const jwtSecret = c.env.JWT_SECRET;
    const clientUrl = c.env.CLIENT_URL;
    const user = await userClass.findUser({ email });
    if (!user) {
      return { error: 'No user found with this email address' };
    }
    const resetUrl = await userClass.generateResetToken(
      jwtSecret,
      clientUrl,
      user.id,
    );
    await resetEmail(
      email,
      resetUrl,
      c.env.STMP_EMAIL,
      c.env.SEND_GRID_API_KEY,
    );
    return c.json({ message: 'Password reset email sent successfully' }, 200);
  } catch (error) {
    return c.json(
      { error: `Failed to send password reset email: ${error.message}` },
      500,
    );
  }
};

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
