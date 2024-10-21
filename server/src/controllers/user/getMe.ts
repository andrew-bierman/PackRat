import type { Context } from 'hono';
import { getUserByTokenService } from '../../services/user/getUserByToken';
import { protectedProcedure } from '../../trpc';

export const getMe = async (c: Context) => {
  try {
    const { user } = await c.req.json();
    console.log('user ', user);
    return c.json({ user }, 200);
  } catch (error) {
    return c.json({ error: `Failed to get user: ${error.message}` }, 500);
  }
};

export function getMeRoute() {
  return protectedProcedure.query(async (opts) => {
    const { user } = opts.ctx;
    return { ...user, role: 'admin' };
  });
}
