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

export const getDB = () => DB;
