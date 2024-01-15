import { TRPCError } from '@trpc/server';
import { User } from '../../drizzle/methods/User';
import * as jwt from 'hono/jwt';

// import * as jwt from 'hono/jwt';

// type JwtPayload = Record<string, unknown>;

/**
 * Extracts the token from the request header.
 * @param {Request} req - The express request object.
 * @returns {string} - The extracted token.
 * @throws {Error} If token is not found.
 */
const extractToken = (req: Request): string => {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
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
 * @param {PrismaClient} prisma - The Prisma client.
 * @param {JwtPayload} decoded - The decoded JWT payload.
 * @param {string} token - The JWT token.
 * @returns {Promise<User>} - The user associated with the token.
 * @throws {Error} If user is not found.
 */
const findUser = async (token: string, jwtSecret: string) => {
  const userClass = new User();
  // const user: any = await userClass.validateResetToken(token, jwtSecret);
  const decoded = await jwt.verify(token, jwtSecret);
  const user = await userClass.findUser({ userId: decoded.id });
  if (!user)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User associated with this token not found.',
    });
  return user;
};

const extractTokenAndGetUser = async (req: Request, jwtSecret: string) => {
  const token = extractToken(req);
  if (!token) return null;
  const user = await findUser(token, jwtSecret);
  return user;
};

export { extractTokenAndGetUser };
