import { type NextFunction, type Request, type Response } from 'express';
import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../trpc';
import { authorizedProcedure } from './authorizedProcedure';

/**
 * Checks if the user making the request is an admin.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {void} This function does not return anything.
 */
export function isAdmin(req: Request, res: Response, next: NextFunction) {
  // Your user object might be different. This is just a sample.
  if (req.user && req.user.role === 'admin') {
    next(); // pass control to the next handler
  } else {
    res.status(403).send({
      message: 'Admin access is required to perform this action',
    });
  }
}

export const adminProcedure = authorizedProcedure
  .use(middleware(async (opts) => {
    if (!opts.ctx.user || opts.ctx.user.role != "admin") {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    try {
      return await opts.next();
    } catch (err) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
  }));