import { type Context } from 'hono';
import { extractTokenAndGetUser } from './utils/auth';
import { createDb } from '../db/client';

let DB: D1Database;

type ContextEnv = Omit<Env, 'DB'>

/**
 * Create a context object that will be passed to all resolvers
 */
export const createContext = (honoContext: Context) => async () => {
  const { env, req } = honoContext;
  const { DB: db, ...restEnv } = env
  DB = db;
  const drizzleClient = await createDb(honoContext.env.DB)
  const user = await extractTokenAndGetUser(req.raw, env.JWT_SECRET);

  return {
    env: restEnv as ContextEnv,
    user,
    db: drizzleClient
  };
};

export type ExtendedContext = Awaited<ReturnType<typeof createContext>>;

export const getDB = () => DB;
