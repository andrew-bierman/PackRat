import { publicProcedure, protectedProcedure } from '../../trpc';
import { getUserByIdService } from '../../services/user/getUserByIdService';
import * as validator from '@packrat/validations';
import { responseHandler } from '../../helpers/responseHandler';

export const getUserById = async (c) => {
  try {
    // Correctly accessing route parameters in Hono
    const userId = c.req.param('userId');

    const user = await getUserByIdService(userId);

    if (!c.locals) c.locals = {};
    c.locals.data = user;
    return responseHandler(c);
  } catch (error) {
    return c.json({ error: `Failed to get user: ${error.message}` }, 500);
  }
};

export function getUserByIdRoute() {
  return protectedProcedure.input(validator.getUserById).query(async (opts) => {
    const { userId } = opts.input;
    return await getUserByIdService(userId);
  });
}
