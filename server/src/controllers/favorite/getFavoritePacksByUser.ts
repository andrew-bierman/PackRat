import { z } from 'zod';
import { getFavoritePacksByUserService } from '../../services/favorite/favorite.service';
import { publicProcedure, protectedProcedure } from '../../trpc';

export const getFavoritePacksByUser = async (c) => {
  try {
    const { userId } = await c.req.parseBody();
    const packs = await getFavoritePacksByUserService(userId);
    return c.json({ packs }, 200);
  } catch (error) {
    return c.json(
      { error: `Failed to get favorite packs: ${error.message}` },
      500,
    );
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
