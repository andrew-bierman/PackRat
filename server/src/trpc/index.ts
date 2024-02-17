import { TRPCError, initTRPC } from '@trpc/server';
import { auth } from './middlewares';
import { ExtendedContext } from './context';

const t = initTRPC.context<ExtendedContext>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(auth);