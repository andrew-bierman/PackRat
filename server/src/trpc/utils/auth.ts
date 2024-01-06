import { TRPCError } from '@trpc/server';
import * as jwt from 'hono/jwt';
import { User } from '../../drizzle/methods/User';

type JwtPayload = Record<string, unknown>;

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
const verifyToken = async (
  token: string,
  jwtSecret: string,
): Promise<JwtPayload> => {
  const decoded: JwtPayload = await jwt.verify(token, jwtSecret ?? '');
  return decoded;
};

/**
 * Finds the user based on the verified token.
 * @param {PrismaClient} prisma - The Prisma client.
 * @param {JwtPayload} decoded - The decoded JWT payload.
 * @param {string} token - The JWT token.
 * @returns {Promise<User>} - The user associated with the token.
 * @throws {Error} If user is not found.
 */
const findUser = async (decoded: JwtPayload, token: string) => {
  const userClass = await new User();
  const user: any = await userClass.findUnique({
    where: {
      id: decoded.id as string,
      token,
    },
  });
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
  const decoded = await verifyToken(token, jwtSecret);
  const user = await findUser(decoded, token);
  return user;
};

export { extractTokenAndGetUser };
