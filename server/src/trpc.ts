import { TRPCError, initTRPC } from '@trpc/server';
import type * as trpcExpress from '@trpc/server/adapters/express';
import { getUserByTokenService } from './services/user/getUserByToken';

const t = initTRPC.context<Context>().create();

/**
 * Create a context object that will be passed to all resolvers
 */
export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  // Create context based on the request object
  // Will be available as `ctx` in all your resolvers

  // Extract the token from the request headers, verify it, and retrieve the user. Add the user to the context object.
  const getUserFromHeader = async () => {
    let user = null;

    // Extract the token from the request headers
    const authHeader = req.headers.authorization || '';

    // If the token is present, verify it
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      // Try to verify the token and retrieve the user
      user = await getUserByTokenService(token);
    }

    return user;
  };

  const user = await getUserFromHeader();
  console.log('user', user);

  return {
    req,
    res,
    user,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

/**
 * Authentication middleware
 */
const isAuthenticated = t.middleware(async (opts) => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    // If the user is invalid, throw an error
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid token',
    });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

export const protectedProcedure = t.procedure.use(isAuthenticated);
