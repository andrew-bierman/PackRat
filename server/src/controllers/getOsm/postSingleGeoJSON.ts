import { protectedProcedure } from '../../trpc';
import { responseHandler } from '../../helpers/responseHandler';
import { postSingleGeoJSONService } from '../../services/osm/osm.service';
import { z } from 'zod';
import { type Context } from 'hono';

export async function postSingleGeoJSON(ctx: Context) {
  try {
    const { geojson } = await ctx.req.json();
    const response = await postSingleGeoJSONService(geojson);
    return ctx.json({ response }, 200);
  } catch (error) {
    return ctx.json({ error: error.message }, 500);
  }
}

export function postSingleGeoJSONRoute() {
  return protectedProcedure
    .input(z.object({ geojson: z.any() }))
    .mutation(async (opts) => {
      const { geojson } = opts.input;
      return await postSingleGeoJSONService(geojson);
    });
}
