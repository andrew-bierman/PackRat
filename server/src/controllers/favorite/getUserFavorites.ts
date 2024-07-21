import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import { getUserFavoritesService } from '../../services/favorite/favorite.service';
import { type Context } from 'hono';

export const getUserFavorites = async (c: Context) => {
  try {
    const { userId } = await c.req.json();
    const favorites = await getUserFavoritesService(userId);
    return c.json({ favorites }, 200);
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

export function getUserFavoritesRoute() {
  return protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      const { userId } = opts.input;
      const favorites = await getUserFavoritesService(userId);
      return favorites;
    });
}
