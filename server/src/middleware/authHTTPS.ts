import jwt, { type JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { type Request, type Response, type NextFunction } from 'express';
import { middleware } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z, ZodError } from 'zod';
import { TokenSchema } from './validators/authTokenValidator';
import { type Context, type Next } from 'hono';
import { responseHandler } from '../helpers/responseHandler';

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
  try {
    const decoded: JwtPayload = jwt.verify(token, secret) as JwtPayload;
    TokenSchema.parse(decoded);
    return decoded;
  } catch (err) {
    throw new Error('Invalid token.');
  }
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
    console.log('Decodedeed', decoded);
    const user = await findUserHTTP(decoded, token);
    console.log('token ', token, ' decoded ', decoded, ' user ', user);
    c.set('token', token);
    c.set('user', user);

    return await next();
  } catch (err) {
    console.log('Eror', err);
    return await handleErrorHTTP(err, c);
  }
};

/**
 * Handles authentication errors.
 * @param {Error} err - The error object.
 * @param {Context} c - The Hono context object.
 */
const handleErrorHTTP = async (err: Error, c: Context) => {
  if (err instanceof ZodError) {
    console.error('Invalid token structure:', err.message);
    const error = { error: 'Invalid token structure.', statusCode: 400 };
    c.set('error', error);
    return await responseHandler(c);
  } else {
    console.error(err.message);
    const error = {
      error: 'Not authorized to access this resource.',
      statusCode: 401,
    };
    c.set('error', error);
    return await responseHandler(c);
  }
};

export default authMiddlewareHTTP;
