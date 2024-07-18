import { type Context } from 'hono';
import { getWeatherService } from '../../services/weather/getWeatherService';
import { publicProcedure } from '../../trpc';
import { z } from 'zod';

export const getWeather = async (c: Context) => {
  try {
    const { lat, lon } = await c.req.json();
    return await getWeatherService(
      c.env.WEATHER_URL,
      c.env.OPENWEATHER_KEY,
      lat,
      lon,
    );
  } catch (error) {
    return c.json({ error: `${error.message}` }, 500);
  }
};

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
