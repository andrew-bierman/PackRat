import User from "../../models/userModel.ts";

/**
 * Checks the provided code against the user's email in the database.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} - a promise that resolves to void
 */
export const checkCode = async (req, res) => {
    const { email, code } = req.body;
    try {
      let user = await User.find({
        $and: [{ email: email.toLowerCase() }, { code: code }],
      });
      if (user.length) {
        res.status(200).json({ message: "success" });
      } else {
        res.status(200).json({ message: "Incorrect code" });
      }
    } catch (error) {
      res.status(404).json({ message: "Server Error" });
    }
  };