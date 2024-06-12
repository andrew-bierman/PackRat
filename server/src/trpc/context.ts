import { type Context } from 'hono';
import { extractTokenAndGetUser } from './utils/auth';
import { DbClient } from '../db/client';
import { VectorClient } from '../vector/client';
import { AiClient } from '../integrations/ai/client';

let DB: D1Database;

type ContextEnv = Omit<Env, 'DB'>;

/**
 * Create a context object that will be passed to all resolvers
 */
export const createContext = (honoContext: Context) => async () => {
  const { env, req } = honoContext;
  const { DB: db, ...restEnv } = env;
  DB = db;

  await DbClient.init(honoContext.env.DB);
  await VectorClient.init(honoContext.env.VECTOR_INDEX);
  await AiClient.init(honoContext.env.AI);

  const user = await extractTokenAndGetUser(req.raw, env.JWT_SECRET);

  return {
    env: restEnv as ContextEnv,
    user,
  };
};

export type ExtendedContext = Awaited<ReturnType<typeof createContext>>;

export const getDB = () => DB;
