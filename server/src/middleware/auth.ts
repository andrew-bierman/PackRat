// import User, { type IUser } from '../models/userModel';
// import jwt, { type JwtPayload } from 'jsonwebtoken';
// import { JWT_SECRET } from '../config';
// import { type Request, type Response, type NextFunction } from 'express';
// import { middleware } from '../trpc';
// import { TRPCError } from '@trpc/server';
// import { z, ZodError } from 'zod';
// import { TokenSchema } from './validators/authTokenValidator';

// declare global {
//   namespace Express {
//     interface Request {
//       user: any;
//       token: string;
//     }
//   }
// }

// // export const authMiddleware = middleware(async (opts) => {
// //   const ctx = opts.ctx;
// //   try {
// //     const token: any = ctx.input.header('Authorization')?.replace('Bearer ', '');
// //     const decoded: any = jwt.verify(token, JWT_SECRET ?? '');
// //     const user: any = await User.findOne({
// //       _id: decoded._id,
// //       token,
// //     });
// //     if (!user) throw new Error();
// //     ctx.set('token', token);
// //     ctx.set('user', user);
// //     return opts.next() // Call the next middleware or procedure
// //   } catch (err) {
// //     console.error(err);
// //     throw new TRPCError({ code: 'UNAUTHORIZED' });
// //   }
// // });

// /**
//  * Extracts the token from the request header.
//  * @param {Request} req - The express request object.
//  * @returns {string} - The extracted token.
//  * @throws {Error} If token is not found.
//  */
// const extractToken = (req: Request): string => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) throw new Error('Token missing from Authorization header.');
//   return token;
// };

// /**
//  * Verifies and validates the token.
//  * @param {string} token - The JWT token.
//  * @returns {JwtPayload} - The decoded JWT payload.
//  * @throws {ZodError} If token structure is invalid.
//  */
// const verifyToken = (token: string): JwtPayload => {
//   const decoded: JwtPayload = jwt.verify(token, JWT_SECRET ?? '') as JwtPayload;
//   const parsedToken = TokenSchema.parse(decoded); // Will throw if invalid
//   return parsedToken;
// };

// /**
//  * Finds the user based on the verified token.
//  * @param {JwtPayload} decoded - The decoded JWT payload.
//  * @param {string} token - The JWT token.
//  * @returns {Promise<IUser>} - The user associated with the token.
//  * @throws {Error} If user is not found.
//  */
// const findUser = async (decoded: JwtPayload, token: string): Promise<IUser> => {
//   const user: IUser | null = await User.findOne({
//     _id: decoded._id,
//     token,
//   });
//   if (!user) throw new Error('User associated with this token not found.');
//   return user;
// };

// /**
//  * Authenticates the user based on the provided token and adds the user information to the request object.
//  * @param {Request} req - The express request object.
//  * @param {Response} res - The express response object.
//  * @param {NextFunction} next - The express next function.
//  */
// const auth = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = extractToken(req);
//     const decoded = verifyToken(token);
//     const user = await findUser(decoded, token);

//     req.token = token;
//     req.user = user;

//     next();
//   } catch (err) {
//     handleError(err, res);
//   }
// };

// /**
//  * Handles authentication errors.
//  * @param {Error} err - The error object.
//  * @param {Response} res - The express response object.
//  */
// const handleError = (err: Error, res: Response) => {
//   if (err instanceof ZodError) {
//     console.error('Invalid token structure:', err.errors);
//     c.status(400).send({ error: 'Invalid token structure.' });
//   } else {
//     console.error(err.message);
//     c.status(401).send({ error: 'Not authorized to access this resource.' });
//   }
// };

// export default auth;

// import { HonoMiddleware } from 'hono';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { JWT_SECRET } from '../config';
import { z, ZodError } from 'zod';
import { TokenSchema } from './validators/authTokenValidator';

export const auth = async (c, next) => {
  try {
    // Extract token
    const token = c.req.header('Authorization')?.replace('Bearer ', '');
    if (!token) c.throw(400, 'Token missing from Authorization header.');

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET ?? '') as jwt.JwtPayload;
    try {
      TokenSchema.parse(decoded);
    } catch (err) {
      if (err instanceof ZodError) {
        console.error('Invalid token structure:', err.errors);
        return c.res.status(400).json({ error: 'Invalid token structure.' });
      }
      throw err;
    }

    // Find user
    const user = await User.findOne({
      _id: decoded._id,
      token,
    });
    if (!user) c.throw(401, 'User associated with this token not found.');

    // Store user and token in Hono context state
    c.state.user = user;
    c.state.token = token;

    // Proceed to next middleware/route
    await next();
  } catch (err) {
    console.error(err.message);
    return c.res
      .status(401)
      .json({ error: 'Not authorized to access this resource.' });
  }
};

export default auth;
