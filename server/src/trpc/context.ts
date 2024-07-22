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
  await VectorClient.init({
    apiKey: honoContext.env.VECTORIZE_API_KEY,
    // indexName: honoContext.env.VECTOR_INDEX,
    indexName: 'vector-index', // TODO: Change to 'VECTOR_INDEX
    accountId: honoContext.env.CLOUDFLARE_ACCOUNT_ID,
  });
  await AiClient.init({
    apiKey: honoContext.env.AI_API_KEY,
    accountId: honoContext.env.CLOUDFLARE_ACCOUNT_ID,
    // honoContext.env.AI
  });

  const user = await extractTokenAndGetUser(req.raw, env.JWT_SECRET);

  return {
    env: restEnv as ContextEnv,
    user,
    executionCtx: honoContext.executionCtx,
  };
};

export type ExtendedContext = Awaited<ReturnType<typeof createContext>>;

export const getDB = () => DB;
