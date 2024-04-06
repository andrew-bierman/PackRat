import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { User } from '../../drizzle/methods/User';
import { validatePassword, hashPassword } from '../../utils/user';
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

export function resetPasswordRoute() {
  return publicProcedure
    .input(validator.resetPassword)
    .mutation(async (opts) => {
      const { resetToken, password } = opts.input;
      const { env } = opts.ctx;
      const JWT_SECRET = env.JWT_SECRET;
      const userClass = new User();
      const user = await userClass.validateResetToken(resetToken, JWT_SECRET);
      const hashedPassword = await hashPassword(
        JWT_SECRET,
        validatePassword(password),
      );
      await userClass.update({ id: user.id, password: hashedPassword });
      return 'Successfully reset password';
    });
}
