import { protectedProcedure } from '../../trpc';
import { responseHandler } from '../../helpers/responseHandler';
import { getTrailsService } from '../../services/trails/getTrailsService';
import { z } from 'zod';
import type { Context } from 'hono';

export async function getTrails(ctx: Context) {
  try {
    const radiusParams = 25;
    const activityParams = true;
    const {
      administrative_area_level_1,
      country,
      locality,
      latitude,
      longitude,
    } = await ctx.req.json();
    const { env }: any = ctx;
    const response = await getTrailsService({
      trailRootUrl: env.GET_TRAIL_ROOT_URL,
      xRapidapiKey: env.X_RAPIDAPI_KEY,
      administrative_area_level_1,
      country,
      locality,
      latitude,
      longitude,
      radiusParams,
      activityParams,
    });
    if (!response) {
      ctx.set('data', 'No Trails Found');
      return await responseHandler(ctx);
    }
    ctx.set('data', response);
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
}

export function getTrailsRoute() {
  return protectedProcedure
    .input(
      z.object({
        administrative_area_level_1: z.string(),
        country: z.string(),
        locality: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      }),
    )
    .mutation(async (opts) => {
      const radiusParams = 25;
      const activityParams = true;
      const {
        administrative_area_level_1,
        country,
        locality,
        latitude,
        longitude,
      } = opts.input;
      const { env }: any = opts.ctx;
      return await getTrailsService({
        trailRootUrl: env.GET_TRAIL_ROOT_URL,
        xRapidapiKey: env.X_RAPIDAPI_KEY,
        administrative_area_level_1,
        country,
        locality,
        latitude,
        longitude,
        radiusParams,
        activityParams,
      });
    });
}
