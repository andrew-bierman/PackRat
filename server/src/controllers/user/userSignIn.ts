import User from "../../models/userModel";

/**
 * Sign in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The user object.
 */
export const userSignIn = async (req, res) => {
  const { email, password } = req.body;
  const user: any = await (User as any).findByCredentials({
    email: email,
    password: password,
  });
  await user.generateAuthToken();
  res.status(200).send({ user });
};
