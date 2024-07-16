import { publicProcedure } from '../../trpc';
import { InvalidCodeError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import * as validator from '@packrat/validations';
import { checkCodeService } from '../../services/user/checkCodeService';
import { type Context } from 'hono';
// /**
//  * Checks the provided code against the user's email in the database.
//  * @param {Object} req - the request object
//  * @param {Object} res - the response object
//  * @return {Promise<void>} - a promise that resolves to void
//  */
export const checkCode = async (c: Context) => {
  const { email, code } = await c.req.json();
  const user: any = await checkCodeService(email, code);
  if (user.length) {
    c.set('data', user);
    responseHandler(c);
  } else {
    c.set('error', InvalidCodeError);
    responseHandler(c);
  }
};

export function checkCodeRoute() {
  return publicProcedure.input(validator.checkCode).mutation(async (opts) => {
    const { email, code } = opts.input;
    return await checkCodeService(email, code);
  });
}
