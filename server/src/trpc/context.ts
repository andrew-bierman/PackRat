import { type Context } from 'hono';
import { extractTokenAndGetUser } from './utils/auth';
import { DbClient } from '../db/client';
import { VectorClient } from '../vector/client';
import { AiClient } from '../integrations/ai/client';
import { type R2Bucket } from '@cloudflare/workers-types';
import { GeojsonStorageService } from '../services/geojsonStorage';

let DB: D1Database;

type ContextEnv = Omit<Env, 'DB'>;

/**
 * Create a context object that will be passed to all resolvers
 */
export const createContext = (honoContext: Context) => async () => {
  const { env, req } = honoContext;
  const { DB: db, GEOJSON_BUCKET, ...restEnv } = env;
  DB = db;

  GeojsonStorageService.init(GEOJSON_BUCKET);
  await DbClient.init(honoContext.env.DB);
  await VectorClient.init({
    apiKey: honoContext.env.VECTORIZE_API_KEY,
    // indexName: honoContext.env.VECTOR_INDEX,
    indexName: honoContext.env.VECTOR_INDEX,
    accountId: honoContext.env.CLOUDFLARE_ACCOUNT_ID,
  });
  await AiClient.init({
    apiKey: honoContext.env.WORKERS_AI_API_KEY,
    accountId: honoContext.env.CLOUDFLARE_ACCOUNT_ID,
    // honoContext.env.AI
  });

  const user = await extractTokenAndGetUser(req.raw, env.JWT_SECRET);

  return {
    env: restEnv as ContextEnv,
    geojsonBucket: GEOJSON_BUCKET as R2Bucket,
    user,
    executionCtx: honoContext.executionCtx,
  };
};

export type ExtendedContext = Awaited<ReturnType<typeof createContext>>;

export const getDB = () => DB;
