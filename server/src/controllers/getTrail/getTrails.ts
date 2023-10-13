import { publicProcedure } from '../../trpc';
import { responseHandler } from '../../helpers/responseHandler';
import * as validators from '@packrat/packages';
import { getTrailsService } from '../../services/trails/getTrailsService';
import { z } from 'zod';

const fetch = async (...args) =>
  import('node-fetch').then(async ({ default: fetch }) =>
    fetch(...(args as Parameters<typeof fetch>)),
  );
/**
 * Retrieves trails based on the provided parameters.
 * @param {Object} req - The request object containing the parameters.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the retrieved trail data or an error message.
 */
export const getTrails = async (c, next) => {
  const radiusParams = 25;
  const activityParams = true;
  const {
    administrative_area_level_1,
    country,
    locality,
    latitude,
    longitude,
  } = c.req.json();
  const response = await getTrailsService(
    administrative_area_level_1,
    country,
    locality,
    latitude,
    longitude,
    radiusParams,
    activityParams,
  );
  res.locals.data = response;
  responseHandler(c);
};

export function getTrailsRoute() {
  return publicProcedure
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
      return await getTrailsService(
        administrative_area_level_1,
        country,
        locality,
        latitude,
        longitude,
        radiusParams,
        activityParams,
      );
    });
}
