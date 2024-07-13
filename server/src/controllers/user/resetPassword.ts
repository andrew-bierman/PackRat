import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { User } from '../../drizzle/methods/User';
import { hashPassword } from '../../utils/user';
import { Context, Next } from 'hono';
/**
 * Resets the user's password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A promise that resolves when the password is successfully reset.
 */
// export const resetPassword = async (req, res) => {
//   const { resetToken, password } = req.body;

//   const user = await prisma.user.validateResetToken(resetToken);

//   await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       password: password,
//     },
//   });
//   res.status(200).send({
//     message: 'Successfully reset password',
//     status: 'success',
//     statusCode: 200,
//   });
// };

export const resetPassword = async (c: Context, next: Next) => {
  try {
    const { resetToken, password } = await c.req.parseBody();
    const { env }: any = c.req;
    const JWT_SECRET = env.JWT_SECRET;
    const userClass = new User();

    // Validate the reset token
    const user = await userClass.validateResetToken(resetToken, JWT_SECRET);
    if (!user) {
      return c.json({ error: 'Invalid reset token' }, 400);
    }

    // Hash the new password
    const hashedPassword = await hashPassword(JWT_SECRET, password);

    // Update the user's password
    await userClass.update({ id: user.id, password: hashedPassword });

    // Send success response
    c.json(
      {
        message: 'Successfully reset password',
        status: 'success',
        statusCode: 200,
      },
      200,
    );
  } catch (err) {
    console.error('Error resetting password:', err);
    c.json({ message: err.message }, 400);
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
