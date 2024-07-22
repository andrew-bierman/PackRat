import { z } from 'zod';
import { getFavoritePacksByUserService } from '../../services/favorite/favorite.service';
import { publicProcedure, protectedProcedure } from '../../trpc';
import { type Context } from 'hono';

export const getFavoritePacksByUser = async (c: Context) => {
  try {
    const { userId } = await c.req.json();
    const packs = await getFavoritePacksByUserService(userId);
    return c.json({ packs }, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function getFavoritePacksByUserRoute() {
  return protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      const { userId } = opts.input;
      const packs = await getFavoritePacksByUserService(userId);
      return packs;
    });
}
