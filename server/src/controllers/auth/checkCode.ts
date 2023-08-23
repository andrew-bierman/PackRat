import { InvalidCodeError } from "../../helpers/errors";
import { responseHandler } from "../../helpers/responseHandler";
import User from "../../models/userModel";

/**
 * Checks the provided code against the user's email in the database.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} - a promise that resolves to void
 */
export const checkCode = async (req: any, res: any, next) => {
  const { email, code } = req.body;
  let user = await User.find({
    $and: [{ email: email.toLowerCase() }, { code: code }],
  });
  if (user.length) {
    responseHandler(res)
  } else {
    next(InvalidCodeError)
  }
};