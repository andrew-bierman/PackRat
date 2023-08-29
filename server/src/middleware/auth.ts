import User, { IUser } from '../models/userModel';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { Request, Response, NextFunction } from 'express';
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
  const decoded: JwtPayload = jwt.verify(token, JWT_SECRET ?? '') as JwtPayload;
  const parsedToken = TokenSchema.parse(decoded); // Will throw if invalid
  return parsedToken;
};

/**
 * Finds the user based on the verified token.
 * @param {JwtPayload} decoded - The decoded JWT payload.
 * @param {string} token - The JWT token.
 * @returns {Promise<IUser>} - The user associated with the token.
 * @throws {Error} If user is not found.
 */
const findUser = async (decoded: JwtPayload, token: string): Promise<IUser> => {
  const user: IUser | null = await User.findOne({
    _id: decoded._id,
    token: token,
  });
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
