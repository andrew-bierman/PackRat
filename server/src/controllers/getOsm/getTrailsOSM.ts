import { getTrailsOsmService } from '../../services/osm/getTrailsOSMService';
import { responseHandler } from '../../helpers/responseHandler';
import { protectedProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { type Context } from 'hono';

export async function getTrailsOSM(ctx: Context) {
  try {
    const {
      lat = 45.5231,
      lon = -122.6765,
      radius = 50000,
    } = await ctx.req.json();
    const { env }: any = ctx;
    const response = await getTrailsOsmService(env.OSM_URI, lat, lon, radius);
    if (!response) {
      ctx.set('data', { data: 'No Trails Found' });
      return await responseHandler(ctx);
    }
    ctx.set('data', { data: response });
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', { error: error.message });
    return await responseHandler(ctx);
  }
}

export function getTrailsOSMRoute() {
  return protectedProcedure
    .input(validator.getTrailsOSM)
    .query(async (opts) => {
      const { lat = 45.5231, lon = -122.6765, radius = 50000 } = opts.input;
      const { env }: any = opts.ctx;
      return await getTrailsOsmService(env.OSM_URI, lat, lon, radius);
    });
}
