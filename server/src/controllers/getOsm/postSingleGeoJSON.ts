import { protectedProcedure } from '../../trpc';
import { responseHandler } from '../../helpers/responseHandler';
import { postSingleGeoJSONService } from '../../services/osm/osm.service';
import { z } from 'zod';
import { type Context } from 'hono';

export async function postSingleGeoJSON(ctx: Context) {
  try {
    const { geojson } = await ctx.req.json();
    const response = await postSingleGeoJSONService(geojson);
    if (!response) {
      ctx.set('data', { data: 'No Post Single GeoJson Found' });
      return await responseHandler(ctx);
    }
    ctx.set('data', { data: response });
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', { error: error.message });
    return await responseHandler(ctx);
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
