import { publicProcedure } from '../../trpc';
import { InvalidCodeError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import * as validator from '@packrat/packages';
import { checkCodeService } from '../../services/user/checkCodeService';
/**
 * Checks the provided code against the user's email in the database.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} - a promise that resolves to void
 */
export const checkCode = async (req: any, res: any, next) => {
  const user = await checkCodeService(c.req.json());
  if (user.length) {
    responseHandler(c);
  } else {
    next(InvalidCodeError);
  }
};

export function checkCodeRoute() {
  return publicProcedure.input(validator.checkCode).mutation(async (opts) => {
    return await checkCodeService(opts.input);
  });
}
