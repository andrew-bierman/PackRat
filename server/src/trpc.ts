import { initTRPC } from '@trpc/server';
import type { Context } from './middleware/auth';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware
export const mergeRouters = t.mergeRouters