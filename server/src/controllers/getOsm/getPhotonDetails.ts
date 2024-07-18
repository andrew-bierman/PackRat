import { responseHandler } from '../../helpers/responseHandler';
import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import { getPhotonDetailsService } from '../../services/osm/getPhotonDetailsService';
import type { Context } from 'hono';

export async function getPhotonDetails(ctx: Context) {
  try {
    const { id, type } = await ctx.req.param();
    const { env }: any = ctx;
    const response = await getPhotonDetailsService(id, type, env.OSM_URI);
    return ctx.json({ response }, 200);
  } catch (error) {
    return ctx.json({ error: error.message }, 500);
  }
}

export function getPhotonDetailsRoute() {
  return protectedProcedure
    .input(
      z.object({ id: z.union([z.string(), z.number()]), type: z.string() }),
    )
    .query(async (opts) => {
      const { id, type } = opts.input;
      const { env }: any = opts.ctx;
      return await getPhotonDetailsService(id, type, env.OSM_URI);
    });
}
