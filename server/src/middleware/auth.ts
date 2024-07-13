import jwt, { type JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { type Request, type Response, type NextFunction } from 'express';
import { middleware } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z, ZodError } from 'zod';
import { TokenSchema } from './validators/authTokenValidator';

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
//       id: decoded.id,
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
 * Extracts the token from the request header.
 * @param {Request} req - The express request object.
 * @returns {string} - The extracted token.
 * @throws {Error} If token is not found.
 */
const extractToken = (req: Request): string => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) throw new Error('Token missing from Authorization header.');
  return token;
};

/**
 * Verifies and validates the token.
 * @param {string} token - The JWT token.
 * @returns {JwtPayload} - The decoded JWT payload.
 * @throws {ZodError} If token structure is invalid.
 */
const verifyToken = (token: string): JwtPayload => {
  console.log('JWT_SECRET', JWT_SECRET)
  const decoded: JwtPayload = jwt.verify(token, JWT_SECRET ?? '') as JwtPayload;
  const parsedToken = TokenSchema.parse(decoded); // Will throw if invalid
  return parsedToken;
};

/**
 * Finds the user based on the verified token.
 * @param {JwtPayload} decoded - The decoded JWT payload.
 * @param {string} token - The JWT token.
 * @returns {Promise<User>} - The user associated with the token.
 * @throws {Error} If user is not found.
 */
// const findUser = async (decoded: JwtPayload, token: string): Promise<User> => {
const findUser = async (decoded: JwtPayload, token: string): Promise<any> => {
  // const user: any = await prisma.user.findUnique({
  //   where: {
  //     id: decoded.id,
  //     token,
  //   },
  // });
  const user = null;
  if (!user) throw new Error('User associated with this token not found.');
  return user;
};

/**
 * Authenticates the user based on the provided token and adds the user information to the request object.
 * @param {Request} req - The express request object.
 * @param {Response} res - The express response object.
 * @param {NextFunction} next - The express next function.
 */
const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = extractToken(req);
    const decoded = verifyToken(token);
    const user = await findUser(decoded, token);

    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    handleError(err, res);
  }
};

/**
 * Handles authentication errors.
 * @param {Error} err - The error object.
 * @param {Response} res - The express response object.
 */
const handleError = (err: Error, res: Response) => {
  if (err instanceof ZodError) {
    console.error('Invalid token structure:', err.errors);
    res.status(400).send({ error: 'Invalid token structure.' });
  } else {
    console.error(err.message);
    res.status(401).send({ error: 'Not authorized to access this resource.' });
  }
};


export default auth;
