import { publicProcedure, protectedProcedure } from '../../trpc';
import { getUserByIdService } from '../../services/user/getUserByIdService';
import * as validator from '@packrat/validations';
import { responseHandler } from '../../helpers/responseHandler';
import { type Context } from 'hono';

export const getUserById = async (ctx: Context) => {
  try {
    // Correctly accessing route parameters in Hono
    const { userId } = await ctx.req.param();
    const user = await getUserByIdService(userId);

    // if (!c.locals) c.locals = {};
    // c.locals.data = user;
    // return responseHandler(c);

    ctx.set('data', user);
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
    // return c.json({ error: `Failed to get user: ${error.message}` }, 500);
  }
};

export function getUserByIdRoute() {
  return protectedProcedure.input(validator.getUserById).query(async (opts) => {
    const { userId } = opts.input;
    return await getUserByIdService(userId);
  });
}
