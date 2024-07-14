import jwt, { type JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { type Request, type Response, type NextFunction } from 'express';
import { middleware } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z, ZodError } from 'zod';
import { TokenSchema } from './validators/authTokenValidator';
import { type Context, type Next } from 'hono';

/**
 * Extracts the token from the request header.
 * @param {Context} c - The Hono context object.
 * @returns {string} - The extracted token.
 * @throws {Error} If token is not found.
 */
const extractTokenHTTP = async (c: Context): Promise<string> => {
  const { authorization } = await c.req.header();
  const token = authorization?.replace('Bearer ', '');
  if (!token) throw new Error('Token missing from Authorization header.');
  return token;
};

/**
 * Verifies and validates the token.
 * @param {string} token - The JWT token.
 * @returns {JwtPayload} - The decoded JWT payload.
 * @throws {ZodError} If token structure is invalid.
 */
const verifyTokenHTTP = (secret: string, token: string): JwtPayload => {
  const decoded: JwtPayload = jwt.verify(token, secret ?? '') as JwtPayload;
  console.log('Decoded', decoded);
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
const findUserHTTP = async (
  decoded: JwtPayload,
  token: string,
): Promise<any> => {
  const user = null;
  if (!user) throw new Error('User associated with this token not found.');
  return user;
};

/**
 * Authenticates the user based on the provided token and adds the user information to the context.
 * @param {Context} c - The Hono context object.
 * @param {Next} next - The Hono next function.
 */
const authMiddlewareHTTP = async (c: Context, next: Next) => {
  try {
    const token = await extractTokenHTTP(c);
    const decoded = verifyTokenHTTP(c.env.JWT_SECRET, token);
    const user = await findUserHTTP(decoded, token);
    c.set('token', token);
    c.set('user', user);

    await next();
  } catch (err) {
    handleErrorHTTP(err, c);
  }
};

/**
 * Handles authentication errors.
 * @param {Error} err - The error object.
 * @param {Context} c - The Hono context object.
 */
const handleErrorHTTP = (err: Error, c: Context) => {
  if (err instanceof ZodError) {
    console.error('Invalid token structure:', err.message);
    c.res.json({ error: 'Invalid token structure.' }, 400);
  } else {
    console.error(err.message);
    c.res.json({ error: 'Not authorized to access this resource.' }, 401);
  }
};

export default authMiddlewareHTTP;
