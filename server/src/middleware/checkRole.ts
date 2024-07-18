import type { Context, Next } from 'hono';
import { RoleSchema } from './validators/roleValidator';
import { ZodError } from 'zod';

// Extend the Context type to include the user property in the request and the next method.
// interface ExtendedContext extends Context {
//   req: Context['req'] & { user?: { role: string } };
//   next: () => Next;
// }

/**
 * Middleware to check if the user has a certain role.
 * @param {string[]} roles - The roles to check against.
 * @returns {Function} - Hono middleware function.
 */
const checkRole = (roles: string[]) => {
  return async (c: Context, next: Next) => {
    const { user } = await c.req.json();

    console.log('user', user.role, roles);

    try {
      // Make sure all roles are valid.
      roles.forEach((role) => RoleSchema.parse(role));

      // Check if user's role is in the allowed roles list.
      if (!user || !roles.includes(user.role)) {
        // Use the appropriate method to send a JSON response.
        return c.json({ error: 'Insufficient permissions' }, 403);
      }

      // Proceed to the next middleware or route handler.
      await next();
    } catch (err) {
      if (err instanceof ZodError) {
        console.error('Invalid role provided:', err.errors);
        return c.json({ error: 'Invalid role provided.' }, 400);
      } else {
        console.error(err.message);
        return c.json({ error: 'Internal server error' }, 500);
      }
    }
  };
};

export default checkRole;
