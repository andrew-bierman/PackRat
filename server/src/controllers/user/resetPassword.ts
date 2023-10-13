import { publicProcedure } from '../../trpc';
import User from '../../models/userModel';
import * as validator from '../../middleware/validators/index';
/**
 * Resets the user's password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A promise that resolves when the password is successfully reset.
 */
export const resetPassword = async (c) => {
  const { resetToken, password } = c.req.json();

  const user = await (User as any).validateResetToken(resetToken);
  user.password = password;
  await user.save();
  c.status(200).send({
    message: 'Successfully reset password',
    status: 'success',
    statusCode: 200,
  });
};

export function resetPasswordRoute() {
  return publicProcedure
    .input(validator.resetPassword)
    .mutation(async (opts) => {
      const { resetToken, password } = opts.input;
      const user = await (User as any).validateResetToken(resetToken);
      user.password = password;
      await user.save();
      return 'Successfully reset password';
    });
}
