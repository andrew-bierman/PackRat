import { publicProcedure, protectedProcedure } from '../../trpc';
import { getUserByIdService } from '../../services/user/getUserByIdService';
import * as validator from '@packrat/validations';
import { responseHandler } from '../../helpers/responseHandler';
import { UserNotFoundError } from '../../helpers/errors';
import { Context, Next } from 'hono';
/**
 * Retrieves a user by their ID from the database and returns the user object as a JSON response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The user object as a JSON response.
 */
export const getUserById = async (c: Context, next: Next) => {
  try {
    const { userId } = await c.req.param();
    const user = await getUserByIdService(userId);
    console.log('user', user)
    c.set('data', user)
    return await responseHandler(c);
  } catch (error) {
    // next(UserNotFoundError);
  }
};

export function getUserByIdRoute() {
  return protectedProcedure.input(validator.getUserById).query(async (opts) => {
    const { userId } = opts.input;
    return await getUserByIdService(userId);
  });
}
