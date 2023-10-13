import { Hono } from 'hono';
import { type IUser } from '../models/userModel';
import { RoleSchema } from './validators/roleValidator';
import { ZodError } from 'zod';

const app = new Hono();

/**
 * Middleware to check if the user has a certain role.
 * @param {string[]} roles - The roles to check against.
 * @returns {Function} - Hono middleware function.
 */
const checkRole = (roles: string[]) => {
  return async (c, next) => {
    const user: IUser = c.get('user'); // Assuming user information is stored in the context object.

    try {
      // Make sure all roles are valid.
      roles.forEach((role) => RoleSchema.parse(role));

      // Check if user's role is in the allowed roles list.
      if (!roles.includes(user.role)) {
        return c.status(403).send({ error: 'Insufficient permissions' });
      }

      await next(); // Call the next middleware or route handler
    } catch (err) {
      if (err instanceof ZodError) {
        console.error('Invalid role provided:', err.errors);
        c.status(400).send({ error: 'Invalid role provided.' });
      } else {
        console.error(err.message);
        c.status(500).send({ error: 'Internal server error' });
      }
    }
  };
};

export default checkRole;
