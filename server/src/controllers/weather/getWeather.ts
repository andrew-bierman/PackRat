import { getWeatherService } from '../../services/weather/getWeatherService';
import { RetrievingWeatherFromOpenWeatherError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure } from '../../trpc';
import { z } from 'zod';

// /**
//  * Retrieves weather data from OpenWeather API based on latitude and longitude.
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  * @return {Object} The weather data retrieved from OpenWeather API.
//  */
// export const getWeather = async (req, res, next) => {
//   try {
//     const response = await getWeatherService(req.query.lat, req.query.lon);
//     res.locals.data = response.data;
//     responseHandler(res);
//   } catch (error) {
//     // send back error message
//     next(RetrievingWeatherFromOpenWeatherError);
//   }
// };

export function getWeatherRoute() {
  return publicProcedure
    .input(z.object({ lat: z.number(), lon: z.number() }))
    .query(async (opts) => {
      const { lat, lon } = opts.input;
      const { env } = opts.ctx;
      return await getWeatherService(
        env.WEATHER_URL,
        env.OPENWEATHER_KEY,
        lat,
        lon,
      );
    });
}
