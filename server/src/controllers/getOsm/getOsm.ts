import osmtogeojson from 'osmtogeojson';
import {
  ErrorProcessingOverpassError,
  ErrorRetrievingOverpassError,
  InvalidRequestParamsError,
} from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure, protectedProcedure } from '../../trpc';
import * as validators from '@packrat/validations';
import { getOsmService } from '../../services/osm/getOsmService';
import { z } from 'zod';
import { Context } from 'hono';

/**
 * Retrieves OpenStreetMap data based on the provided activity type, start point, and end point.
 * @param {Object} req - The request object containing the activity type, start point, and end point.
 * @param {Object} res - The response object used to send the retrieved OpenStreetMap data.
 * @return {Promise<void>} - A promise that resolves when the OpenStreetMap data is successfully retrieved and sent.
 */
// export const getOsm = async (req, res, next) => {
//   console.log('req', req); // log the request body to see what it looks like
//   try {
//     const { activityType, startPoint, endPoint } = req.body;
//     const result = await getOsmService({ activityType, startPoint, endPoint });
//     res.locals.data = result;
//     responseHandler(res);
//   } catch (error) {
//     next(ErrorRetrievingOverpassError);
//   }
// };

export async function getOsm(ctx: Context) {
  try {
    const { env }: any = ctx;
    const { activityType, startPoint, endPoint } = await ctx.req.json();
    const response = await getOsmService({
      activityType,
      startPoint,
      endPoint,
      osmURI: env.OSM_URI,
    });
    if (!response) {
      ctx.set('data', { error: 'OSM Not Found' });
      return await responseHandler(ctx);
    }
    ctx.set('data', response);
    return await responseHandler(ctx);
  } catch (error) {
    ctx.set('error', error.message);
    return await responseHandler(ctx);
  }
}

export function getOsmRoute() {
  return protectedProcedure
    .input(
      z.object({
        activityType: z.string(),
        startPoint: z.object({ latitude: z.number(), longitude: z.number() }),
        endPoint: z.object({ latitude: z.number(), longitude: z.number() }),
      }),
    )
    .query(async (opts) => {
      const { env }: any = opts.ctx;
      try {
        const { activityType, startPoint, endPoint } = opts.input;
        return await getOsmService({
          activityType,
          startPoint,
          endPoint,
          osmURI: env.OSM_URI,
        });
      } catch (error) {
        // throw ErrorRetrievingOverpassError;
        return ErrorRetrievingOverpassError;
      }
    });
}
