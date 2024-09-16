import { getPacksService } from '../../services/pack/pack.service';
import { protectedProcedure } from '../../trpc';
import { z } from 'zod';

export const getPacks = async (c) => {
  try {
    const { ownerId, queryBy } = await c.req.param();
    const packs = await getPacksService(ownerId, queryBy || null);
    return c.json({ packs, message: 'Packs retrieved successfully' }, 200);
  } catch (error) {
    return c.json({ error: `Failed to get packs: ${error.message}` }, 500);
  }
};

export function getPacksRoute() {
  return protectedProcedure
    .input(
      z.object({
        ownerId: z.string(),
        queryBy: z.string().optional(),
        searchQuery: z.string().optional(),
        page: z.number().optional(),
        limit: z.number().optional(),
      })
    )
    .query(async (opts) => {
      const { ownerId, queryBy, searchQuery, page, limit } = opts.input;

      const packs = await getPacksService(
        ownerId,
        queryBy,
        searchQuery,
        page,
        limit,
        opts?.ctx?.user?.id !== ownerId
      );
      return {
        packs,
        message: 'Packs retrieved successfully',
      };
    });
}

