import { publicProcedure } from '../../trpc';
import User from '../../models/userModel';
import { sendWelcomeEmail, resetEmail } from '../../utils/accountEmail';
import * as validator from '../../middleware/validators/index';
/**
 * Sends an email to the specified email address.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the email is sent.
 */
export const sentEmail = async (c) => {
  try {
    const { email } = c.req.json();

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const resetUrl = await user.generateResetToken();
    resetEmail(user.email, resetUrl);
    c.status(200).send({
      message: 'Reset Token has been sent successfully',
      status: 'success',
      statusCode: 200,
    });
  } catch (err) {
    c.status(400).send({ message: err.message });
  }
};

export function sentEmailRoute() {
  return publicProcedure.input(validator.sentEmail).query(async (opts) => {
    const { email } = opts.input;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const resetUrl = await user.generateResetToken();
    resetEmail(user.email, resetUrl);
    return 'Reset Token has been sent successfully';
  });
}
