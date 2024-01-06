import { publicProcedure } from '../../trpc';
import * as validator from '../../middleware/validators/index';
import { User } from '../../drizzle/methods/User';
import * as jwt from 'jsonwebtoken';

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
      const { env }: any = opts.ctx;
      const JWT_SECRET = env.JWT_SECRET;
      const user = new User();
      const userDoc: any = await jwt.verify(resetToken, JWT_SECRET);
      if (!userDoc?.id) {
        throw new Error('Invalid token');
      }
      await user.update(
        {
          password,
        },
        userDoc.id,
      );
      return 'Successfully reset password';
    });
}
