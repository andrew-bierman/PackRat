import { TRPCError } from '@trpc/server';
import { User as UserRepository } from '../../drizzle/methods/User';
import { type User } from 'src/db/schema';
import * as jwt from 'hono/jwt';

// import * as jwt from 'hono/jwt';

// type JwtPayload = Record<string, unknown>;

/**
 * Extracts the token from the request header.
 * @param {Request} req - The express request object.
 * @returns {string} - The extracted token.
 * @throws {Error} If token is not found.
 */
const extractToken = (req: Request): string | null => {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return null;
  }
  return token;
};

/**
 * Verifies and validates the token.
 * @param {string} token - The JWT token.
 * @param {string} jwtSecret - The JWT secret.
 * @returns {Promise<JwtPayload>} - The decoded JWT payload.
 * @throws {ZodError} If token structure is invalid.
 */

/**
 * Finds the user based on the verified token.
 * @param {string} token - The JWT token.
 * @param {string} jwtSecret - The JWT secret.
 * @returns {Promise<User>} - The user associated with the token. Resolves to null if token couldn't be verified or user is not found.
 */
const findUser = async (token: string, jwtSecret: string): Promise<User> => {
  const userRepository = new UserRepository();
  let user: User = null;
  // const user: any = await userClass.validateResetToken(token, jwtSecret);
  try {
    const decoded = await jwt.verify(token, jwtSecret);
    user = await userRepository.findUser({ userId: decoded.id as string });
  } catch {
    // pass
  }
  return user;
};

const extractTokenAndGetUser = async (req: Request, jwtSecret: string) => {
  const token = extractToken(req);
  if (!token) return null;
  const user = await findUser(token, jwtSecret);
  return user;
};

export { extractTokenAndGetUser };
