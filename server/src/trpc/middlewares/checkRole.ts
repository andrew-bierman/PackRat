import { TRPCError } from '@trpc/server';
import { ZodError } from 'zod';
import { RoleSchema } from '@packrat/validations';
import { type User } from '../../db/schema';

/**
 * Middleware to check if the user has a certain role.
 * @param {string[]} roles - The roles to check against.
 * @returns {Function} - tRPC middleware function.
 */
export const checkRole =
  (roles: string[]) =>
  async ({ ctx, next }) => {
    const user: User = ctx.user;

    try {
      // Make sure all roles are valid.
      roles.forEach((role) => RoleSchema.parse(role));

      // Check if user's role is in the allowed roles list.
      if (!roles.includes(user.role)) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Insufficient permissions',
        });
      }

      return next({
        ctx,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        console.error('Invalid role provided:', err.errors);
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid role provided.',
        });
      } else {
        console.error(err.message);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal server error',
        });
      }
    }
  };

export default checkRole;
