import User from '../../models/userModel';
import { sendWelcomeEmail, resetEmail } from '../../utils/accountEmail';

/**
 * Sends an email to the specified email address.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the email is sent.
 */
export const sentEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const resetUrl = await user.generateResetToken();
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
