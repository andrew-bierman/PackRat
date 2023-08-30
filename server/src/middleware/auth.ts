import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { type Request, type Response, type NextFunction } from 'express';
import { middleware } from '../trpc';
import { TRPCError } from '@trpc/server';

declare global {
  namespace Express {
    interface Request {
      user: any;
      token: string;
    }
  }
}

// export const authMiddleware = middleware(async (opts) => {
//   const ctx = opts.ctx;
//   try {
//     const token: any = ctx.input.header('Authorization')?.replace('Bearer ', '');
//     const decoded: any = jwt.verify(token, JWT_SECRET ?? '');
//     const user: any = await User.findOne({
//       _id: decoded._id,
//       token,
//     });
//     if (!user) throw new Error();
//     ctx.set('token', token);
//     ctx.set('user', user);
//     return opts.next() // Call the next middleware or procedure
//   } catch (err) {
//     console.error(err);
//     throw new TRPCError({ code: 'UNAUTHORIZED' });
//   }
// });

/**
 * Authenticates the user based on the provided token and adds the user information to the request object.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {void} Void.
 */
const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: any = req.header('Authorization')?.replace('Bearer ', '');
    const decoded: any = jwt.verify(token, JWT_SECRET ?? '');
    const user: any = await User.findOne({
      _id: decoded._id,
      token,
    });
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: 'Please authenticate' });
  }
};
export default auth;
