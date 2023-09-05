import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
const t = initTRPC.create();
export const trpcRouter = t.router;
export const trpcMiddleware = t.middleware;
export const publicProcedure = t.procedure;
