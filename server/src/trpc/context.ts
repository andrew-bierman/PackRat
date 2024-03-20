import { type Context } from 'hono';
import { extractTokenAndGetUser } from './utils/auth';

let DB: D1Database;

/**
 * Create a context object that will be passed to all resolvers
 */
export const createContext = (honoContext: Context) => async () => {
  const { env, req } = honoContext;
  DB = honoContext.env.DB;
  const user = await extractTokenAndGetUser(req.raw, env.JWT_SECRET);

  return {
    env,
    user,
  };
};

/**
 * Defines your inner context shape.
 * Add fields here that the inner context brings.
 */
interface CreateInnerContextOptions {
  user?: any; // Replace `any` with your actual user type
  env?: any; // Replace `any` with your actual env type
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
  DB = opts.env.DB;

  return {
    user: opts.user,
    env: opts.env,
  };
}

export type ExtendedContext = Awaited<ReturnType<typeof createContextInner>>;

export const getDB = () => DB;
