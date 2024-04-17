import { publicProcedure } from '../../trpc';
import { resetEmail } from '../../utils/accountEmail';
import * as validator from '@packrat/validations';
import { User } from '../../drizzle/methods/User';

/**
 * Sends an email to the specified email address.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the email is sent.
 */
// export const sentEmail = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await prisma.user.findUnique({ where: { email } });
//     const userWithMethods = User(user);
//     if (!user) {
//       throw new Error('User not found');
//     }
//     const resetUrl = await userWithMethods.generateResetToken();
//     resetEmail(userWithMethods.email, resetUrl);
//     res.status(200).send({
//       message: 'Reset Token has been sent successfully',
//       status: 'success',
//       statusCode: 200,
//     });
//   } catch (err) {
//     res.status(400).send({ message: err.message });
//   }
// };

export function sentEmailRoute() {
  return publicProcedure.input(validator.sentEmail).mutation(async (opts) => {
    const { email } = opts.input;
    const { env }: any = opts.ctx;
    const STMP_EMAIL = env.STMP_EMAIL;
    const SEND_GRID_API_KEY = env.SEND_GRID_API_KEY;
    const JWT_SECRET = env.JWT_SECRET;
    const CLIENT_URL = env.CLIENT_URL;
    const userClass = new User();
    const user = await userClass.findUser({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const resetUrl = await userClass.generateResetToken(
      JWT_SECRET,
      CLIENT_URL,
      user.id,
    );
    await resetEmail(user.email, resetUrl, STMP_EMAIL, SEND_GRID_API_KEY);
    return 'Reset Token has been sent successfully';
  });
}
