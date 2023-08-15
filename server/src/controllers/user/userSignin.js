import User from "../../models/userModel.ts";

/**
 * Sign in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The user object.
 */
export const userSignin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials({
        email: email,
        password:password,
      });
      await user.generateAuthToken();
      res.status(200).send({ user });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };
  