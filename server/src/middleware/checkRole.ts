import { type Request, type Response, type NextFunction } from 'express';
import { RoleSchema } from './validators/roleValidator';
import { ZodError } from 'zod';
// import { type User } from '@prisma/client/edge';

/**
 * Middleware to check if the user has a certain role.
 * @param {string[]} roles - The roles to check against.
 * @returns {Function} - Express middleware function.
 */
const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, env: Env, next: NextFunction) => {
    const user: any = req.user;

    try {
      // Make sure all roles are valid.
      roles.forEach((role) => RoleSchema.parse(role));

      // Check if user's role is in the allowed roles list.
      if (!roles.includes(user.role)) {
        return res.status(403).send({ error: 'Insufficient permissions' });
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        console.error('Invalid role provided:', err.errors);
        res.status(400).send({ error: 'Invalid role provided.' });
      } else {
        console.error(err.message);
        res.status(500).send({ error: 'Internal server error' });
      }
    }
  };
};

export default checkRole;
