import User from '../../models/userModel';

/**
 * Resets the user's password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A promise that resolves when the password is successfully reset.
 */
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;

    const user = await (User as any).validateResetToken(resetToken);
    user.password = password;
    await user.save();
    res.status(200).send({
      message: 'Successfully reset password',
      status: 'success',
      statusCode: 200,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
