import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import { getUserFavoritesService } from '../../services/favorite/favorite.service';
import { type Context } from 'hono';
import { getPaginationResponse } from 'src/helpers/pagination';

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
    .input(
      z.object({
        userId: z.string(),
        pagination: z.object({ limit: z.number(), offset: z.number() }),
        searchTerm: z.string().optional(),
        isPreview: z.boolean().optional(),
      }),
    )
    .query(async (opts) => {
      const { userId, pagination, searchTerm } = opts.input;
      const { data, totalCount, currentPagination } =
        await getUserFavoritesService(userId, { searchTerm }, pagination);

      return {
        data,
        ...getPaginationResponse(currentPagination, totalCount as number),
      };
    });
}
