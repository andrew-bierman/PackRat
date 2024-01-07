import * as jwt from 'hono/jwt';

// import { prisma } from '../../prisma';
// import {
//   STMP_EMAIL,
//   CLIENT_URL,
//   JWT_SECRET,
//   SEND_GRID_API_KEY,
// } from '../../config';

// import sgMail from '@sendgrid/mail';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure } from '../../trpc';
import * as validator from '../../middleware/validators/index';
import { z } from 'zod';
import { resetEmail } from '../../utils/accountEmail';
// sgMail.setApiKey(SEND_GRID_API_KEY);

// Generate a password reset token that includes the user's email address
const generatePasswordResetToken = async (email, secret) => {
  const payload = { email };
  return jwt.sign(payload, secret);
};

/**
 * Sends a password reset email to the user and updates the user's password reset token.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @return {Object} The HTTP response object with a success message or an error message.
 */
// export const requestPasswordResetEmailAndToken = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     if (!user) {
//       return res
//         .status(400)
//         .send({ error: 'No user found with this email address' });
//     }

//     const resetToken = generatePasswordResetToken(email);
//     const resetTokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000);

//     await prisma.user.update({
//       where: {
//         email: email,
//       },
//       data: {
//         passwordResetToken: resetToken,
//         passwordResetTokenExpiration: resetTokenExpiration,
//       },
//     });
//     const resetUrl = `${CLIENT_URL}/password-reset?token=${resetToken}`;
//     resetEmail
//     // sendPasswordResetEmail(email, resetUrl);

//     res.locals.data = { message: 'Password reset email sent successfully' };
//     responseHandler(res);
//   } catch (error) {
//     console.error('Error sending password reset email:', error);
//     return res.status(500).send({ error: 'Internal server error' });
//   }
// };

export function requestPasswordResetEmailAndTokenRoute() {
  return publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async (opts) => {
      const { email } = opts.input;
      const { prisma, env }: any = opts.ctx;
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        return { error: 'No user found with this email address' };
      }
      const resetToken = await generatePasswordResetToken(
        email,
        env.JWT_SECRET,
      );
      const resetTokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000);

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          passwordResetToken: resetToken,
          passwordResetTokenExpiration: resetTokenExpiration,
        },
      });
      const resetUrl = `${env.CLIENT_URL}/password-reset?token=${resetToken}`;

      await resetEmail(email, resetUrl, env.STMP_EMAIL, env.SEND_GRID_API_KEY);
      return { message: 'Password reset email sent successfully' };
    });
}
