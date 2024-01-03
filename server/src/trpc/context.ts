import { Context } from 'hono';
import { extractTokenAndGetUser } from './utils/auth';

let DB: D1Database;

export const createContext = (honoContext: Context) => async () => {
  const { env, req} = honoContext;
  DB = honoContext.env.production
  const user = await extractTokenAndGetUser(
    req.raw,
    env.JWT_SECRET,
  );

  return {
    env,
    user,
  };
};

export const getDB = () => DB