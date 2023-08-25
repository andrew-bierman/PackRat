import User from '../models/userModel';

/**
 * Logs in a user based on the provided email, password, and source.
 *
 * @param {Object} params - The parameters for logging in.
 * @param {string} params.email - The user's email.
 * @param {string} params.password - The user's password.
 * @param {string} params.from - The source of the login.
 * @throws {Error} If the email or password is missing.
 * @throws {Error} If the source is invalid.
 * @throws {Error} If the email is incorrect.
 * @return {Promise<any>} The logged in user.
 */
export const loginUser = async ({
  email,
  password,
  from,
}: {
  email: string;
  password: string;
  from: string;
}) => {
  let user: any = [];
  if (from === 'UserSignIn') {
    user = await User.find({
      $and: [{ email: email.toLowerCase() }, { password }],
    }).select('-password');

    if (!email || !password) {
      throw new Error('All fields must be filled');
    }
  }

  if (from === 'GoogleSignIn') {
    user = await User.findOne({ email: email.toLowerCase() }).select(
      '-password',
    );
    if (!email) {
      throw new Error('All fields must be filled');
    }
  }
  // Out of two signin methods.
  if (!(from === 'GoogleSignIn' || from === 'UserSignIn')) {
    throw new Error('Something went wrong');
  }

  if (user.length == 0) {
    throw new Error('Wrong email');
  }

  return user;
};
