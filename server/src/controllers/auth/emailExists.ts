import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { emailExistsService } from '../../services/user/emailExistsService';

export const emailExists = async (c) => {
  try {
    const { email } = await c.req.parseBody();

    const emailExists = await emailExistsService({
      sendGridApiKey: c.env.SEND_GRID_API_KEY,
      smtpEmail: c.env.STMP_EMAIL,
      email,
    });
    return c.json({ emailExists }, 200);
  } catch (error) {
    return c.json({ error: `Failed to delete user: ${error.message}` }, 404);
  }
};

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
