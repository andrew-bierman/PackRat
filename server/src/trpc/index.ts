import { initTRPC } from '@trpc/server';
import { auth } from './middlewares';
import dotenv from 'dotenv';
import { Miniflare } from 'miniflare';

const miniFlare = new Miniflare({
  d1Databases: ['DB'],
  scriptPath: '',
});

export const createTestCallerContext = async () => {
  const db = await miniFlare.getD1Database('DB');

  const { parsed } = dotenv.config();

  return { env: { ...parsed, DB: db } };
};

const t = initTRPC.create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(auth);
// export const protectedProcedure = t.procedure.use;

/**
 * Create a server-side caller
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;
