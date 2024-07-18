import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import { getUserFavoritesService } from '../../services/favorite/favorite.service';

export const getUserFavorites = async (c) => {
  try {
    const { userId } = await c.req.parseBody();
    const favorites = await getUserFavoritesService(userId);
    return c.json({ favorites }, 200);
  } catch (error) {
    return c.json(
      { error: `Failed to get user favorites: ${error.message}` },
      500,
    );
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
