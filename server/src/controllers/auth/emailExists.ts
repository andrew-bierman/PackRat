import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { emailExistsService } from '../../services/user/emailExistsService';
import { type Context } from 'hono';
import { responseHandler } from '../../helpers/responseHandler';
/**
 * Check if the provided email exists in the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} - A promise that resolves to nothing.
 */

export async function emailExists(ctx: Context) {
  try {
    const { email } = await ctx.req.json();
    const { env } = ctx;
    const response = await emailExistsService({
      sendGridApiKey: env.SEND_GRID_API_KEY,
      smtpEmail: env.STMP_EMAIL,
      email,
    });
    if (!response) {
      const data = 'Email Does Not Exist';
      ctx.set('data', data);
      return await responseHandler(ctx);
    }
    ctx.set('data', response);
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
}

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
