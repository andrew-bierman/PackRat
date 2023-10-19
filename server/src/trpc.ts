import { TRPCError, initTRPC } from '@trpc/server';
import { inferAsyncReturnType } from '@trpc/server';
import superJson from 'superjson';

const createContext = async ({ req, res }) => {
  return {
    req,
    res,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  // transformer: superJson,
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
