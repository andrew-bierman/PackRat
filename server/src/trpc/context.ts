import { Context } from 'hono';
import { extractTokenAndGetUser } from './utils/auth';

interface Tcontext extends Context {
  d1: D1Database
}
let DB: D1Database;

export const createContext = (honoContext: Tcontext) => async () => {
  const { env, req, d1 } = honoContext;
  DB = d1
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