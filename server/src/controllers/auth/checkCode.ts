import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { checkCodeService } from '../../services/user/checkCodeService';
// /**
//  * Checks the provided code against the user's email in the database.
//  * @param {Object} req - the request object
//  * @param {Object} res - the response object
//  * @return {Promise<void>} - a promise that resolves to void
//  */
export const checkCode = async (c) => {
  const { email, code } = await c.req.parseBody();
  try {
    const response = await checkCodeService(email, code);
    return c.json({ response }, 200);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
};

export function checkCodeRoute() {
  return publicProcedure.input(validator.checkCode).mutation(async (opts) => {
    const { email, code } = opts.input;
    return await checkCodeService(email, code);
  });
}
