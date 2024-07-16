import { type Request, type Response, type NextFunction } from 'express';
import { RoleSchema } from './validators/roleValidator';
import { ZodError } from 'zod';
import { type Context, type Next } from 'hono';
import { responseHandler } from '../helpers/responseHandler';
// import { type User } from '@prisma/client/edge';

/**
 * Middleware to check if the user has a certain role.
 * @param {string[]} roles - The roles to check against.
 * @returns {Function} - Express middleware function.
 */
const checkRole = (roles: string[]) => {
  return async (ctx: Context, next: Next) => {
    try {
      const user: any = ctx.get('user');
      // Make sure all roles are valid.
      roles.forEach((role) => RoleSchema.parse(role));

      // Check if user's role is in the allowed roles list.
      if (!roles.includes(user.role)) {
        ctx.set('error', { error: 'Insufficient permissions' });
        return await responseHandler(ctx);
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        console.error('Invalid role provided:', err.errors);
        ctx.set('error', { error: 'Invalid role provided.' });
        return await responseHandler(ctx);
      } else {
        console.error(err.message);
        ctx.set('error', { error: 'Internal server error' });
        return await responseHandler(ctx);
      }
    }
  };
};

export default checkRole;
