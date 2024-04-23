import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { emailExistsService } from '../../services/user/emailExistsService';
/**
 * Check if the provided email exists in the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} - A promise that resolves to nothing.
 */

export function emailExistsRoute() {
  return publicProcedure.input(validator.emailExists).mutation(async (opts) => {
    const { email } = opts.input;
    const { env } = opts.ctx;
    return await emailExistsService({
      sendGridApiKey: env.SEND_GRID_API_KEY,
      smtpEmail: env.STMP_EMAIL,
      email,
    });
  });
}
