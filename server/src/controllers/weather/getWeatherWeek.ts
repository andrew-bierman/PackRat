import { getWeatherWeekService } from '../../services/weather/getWeatherWeekService';
import { RetrievingWeatherFromOpenWeatherError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure } from '../../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

/**
 * Retrieves the weather forecast for the week based on latitude and longitude parameters.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<Object>} the weather data for the week
 */
export const getWeatherWeek = async (req, res, next) => {
  try {
    const response = await getWeatherWeekService(req.query.lat, req.query.lon);
    res.locals.data = response.data;
    responseHandler(res);
  } catch (error) {
    next(RetrievingWeatherFromOpenWeatherError);
  }
};

export function getWeatherWeekRoute() {
  return publicProcedure.input(z.object({ lat: z.number(), lon: z.number() })).query(async (opts) => {
    try {
      const { lat, lon } = opts.input;
      const response = await getWeatherWeekService(lat, lon);
      return response.data;
    } catch (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    }
  })
}
