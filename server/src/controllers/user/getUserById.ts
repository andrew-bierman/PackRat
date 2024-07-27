import { publicProcedure, protectedProcedure } from '../../trpc';
import { getUserByIdService } from '../../services/user/getUserByIdService';
import * as validator from '@packrat/validations';
import { responseHandler } from '../../helpers/responseHandler';
import { type Context } from 'hono';

export const getUserById = async (ctx: Context) => {
  try {
    const { userId } = await ctx.req.param();
    const user = await getUserByIdService(userId);

    ctx.set('data', user);
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
};

export function getUserByIdRoute() {
  return protectedProcedure.input(validator.getUserById).query(async (opts) => {
    const { userId } = opts.input;
    return await getUserByIdService(userId);
  });
}
