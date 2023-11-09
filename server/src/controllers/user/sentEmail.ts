import { publicProcedure } from '../../trpc';
import { prisma } from '../../prisma';
import { sendWelcomeEmail, resetEmail } from '../../utils/accountEmail';
import * as validator from '../../middleware/validators/index';

import { generateResetToken } from '../../utils/prismaHelpers/user';
/**
 * Sends an email to the specified email address.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the email is sent.
 */
export const sentEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } } as any);
    if (!user) {
      throw new Error('User not found');
    }
    const resetUrl = await generateResetToken(user);
    resetEmail(user.email, resetUrl);
    res.status(200).send({
      message: 'Reset Token has been sent successfully',
      status: 'success',
      statusCode: 200,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export function sentEmailRoute() {
  return publicProcedure.input(validator.sentEmail).query(async (opts) => {
    const { email } = opts.input;
    const user = await prisma.user.findUnique({ where: { email } } as any);
    if (!user) {
      throw new Error('User not found');
    }
    const resetUrl = await generateResetToken(user);
    resetEmail(user.email, resetUrl);
    return 'Reset Token has been sent successfully';
  });
}
