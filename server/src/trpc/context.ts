import { Context } from 'hono';
import { getPrismaClient } from '../prisma';
import { extractTokenAndGetUser } from './utils/auth';

export const createContext = (honoContext: Context) => async () => {
  const { env, req } = honoContext;
  const prisma = getPrismaClient(env.PRISMA_DATA_PROXY_URI as string);
  const user = await extractTokenAndGetUser(
    req.raw,
    env.JWT_SECRET,
    prisma as any,
  );

  return {
    prisma,
    env,
    user,
  };
};
