import { publicProcedure } from '../../trpc';
import { InvalidCodeError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import User from '../../models/userModel';
import * as validator from '../../../../packages/src/validations';
/**
 * Checks the provided code against the user's email in the database.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} - a promise that resolves to void
 */
export const checkCode = async (req: any, res: any, next) => {
  const { email, code } = req.body;
  const user = await User.find({
    $and: [{ email: email.toLowerCase() }, { code }],
  });
  if (user.length) {
    responseHandler(res);
  } else {
    next(InvalidCodeError);
  }
};

export function checkCodeRoute() {
  return publicProcedure
    .input(validator.checkCode)
    .mutation(async (opts) => {
      const { email, code } = opts.input;
      const user = await User.find({
        $and: [{ email: email.toLowerCase() }, { code }],
      });
      return user;
    });
}