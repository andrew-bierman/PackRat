import { TRPCError, initTRPC } from '@trpc/server';
import type * as trpcExpress from '@trpc/server/adapters/express';
import { getUserByTokenService } from './services/user/getUserByToken';
import { ZodError } from 'zod';

/**
 * Create error formatter to handle Zod errors
 */
export const errorFormatter = (opts) => {
  const { shape, error } = opts;
  return {
    ...shape,
    data: {
      ...shape.data,
      zodError:
        error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
          ? error.cause.flatten()
          : null,
    },
  };
};

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
    let user: any = null;

    // Extract the token from the request headers
    const authHeader = req.headers.authorization || '';

    // If the token is present, verify it
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      // Check if token is defined
      if (token) {
        user = await getUserByTokenService(token);
      }
    }

    return user;
  };

  const user = await getUserFromHeader();

  const contextInner = await createContextInner({ user });

  return {
    req,
    res,
    ...contextInner,
  };
};

/**
 * Defines your inner context shape.
 * Add fields here that the inner context brings.
 */
interface CreateInnerContextOptions {
  user?: any; // Replace `any` with your actual user type
}

/**
 * Inner context. Will always be available in your procedures, in contrast to the outer context.
 *
 * Also useful for:
 * - testing, so you don't have to mock Next.js' `req`/`res`
 * - tRPC's `createServerSideHelpers` where we don't have `req`/`res`
 *
 * @link https://trpc.io/docs/v11/context#inner-and-outer-context
 */
export async function createContextInner(opts: CreateInnerContextOptions = {}) {
  return {
    user: opts.user,
  };
}

export type Context = Awaited<ReturnType<typeof createContextInner>>;

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
const t = initTRPC.context<Context>().create({
  errorFormatter,
});
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

/**
 * Create a server-side caller
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;
