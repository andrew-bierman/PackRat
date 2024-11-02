import { publicProcedure, protectedProcedure } from '../../trpc';
import { getPublicPacksService } from '../../services/pack/pack.service';
import { z } from 'zod';
import { type Context } from 'hono';

export const getPublicPacks = async (c: Context) => {
  const query = c.req.query();
  const { page, limit } = query;
  try {
    const { queryBy } = query;
    const packs = await getPublicPacksService(
      queryBy,
      Number(page),
      Number(limit),
    );
    return c.json(
      { packs, message: 'Public packs retrieved successfully' },
      200,
    );
  } catch (error) {
    return c.json(
      { error: `Failed to get public packs: ${error.message}` },
      500,
    );
  }
};

export function getPublicPacksRoute() {
  return protectedProcedure
    .input(
      z.object({
        queryBy: z.string(),
        page: z.number().optional(),
        limit: z.number().optional(),
      }),
    )
    .query(async (opts) => {
      const { queryBy, page, limit } = opts.input;
      const packs = await getPublicPacksService(queryBy, page, limit);
      return packs;
    });
}
