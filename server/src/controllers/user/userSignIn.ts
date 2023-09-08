import User from '../../models/userModel';

/**
 * Sign in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The user object.
 */


export const trpcSignIn = async(input) => {
  const { email, password } = input;
  const user: any = await (User as any).findByCredentials({
    email,
    password,
  });
  await user.generateAuthToken();
  return user;
}
export const userSignIn = async (req, res) => {
  const { email, password } = req.body;
  const user: any = await (User as any).findByCredentials({
    email,
    password,
  });
  await user.generateAuthToken();
  res.status(200).send({ user });
};
