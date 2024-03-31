import { TRPCError, initTRPC } from '@trpc/server';
import { auth } from './middlewares';
import { type ExtendedContext } from './context';
import { errorFormatter } from './errorFormatter';

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
const t = initTRPC.context<ExtendedContext>().create({
  errorFormatter,
});
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(auth);
export const createCallerFactory = t.createCallerFactory
