import axios from 'axios';
import { RetrievingWeatherFromOpenWeatherError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure } from '../../trpc';
import { z } from 'zod';

/**
 * Retrieves weather data from OpenWeather API based on latitude and longitude.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The weather data retrieved from OpenWeather API.
 */
export const getWeather = async (req, res, next) => {
  const root = process.env.WEATHER_URL;
  const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;
  const latParams = req.query.lat;
  const lonParams = req.query.lon;
  const unitParams = 'imperial';
  const apiParams = true;

  let params = '?';
  if (latParams) params += `lat=${latParams}`;
  if (lonParams) params += `&lon=${lonParams}`;
  if (unitParams) params += `&units=${unitParams}`;
  if (apiParams) params += `&appid=${OPENWEATHER_KEY}`;

  const url = root + params;

  try {
    const response = await axios.get(url);
    res.locals.data = response.data;
    responseHandler(res);
  } catch (error) {
    // send back error message
    next(RetrievingWeatherFromOpenWeatherError);
  }
};

export function getWeatherRoute() {
  return publicProcedure.input(z.object({ lat: z.number(), lon: z.number() })).query(async (opts) => {
    const { lat, lon } = opts.input;
    const root = process.env.WEATHER_URL;
    const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;
    const latParams = lat
    const lonParams = lon
    const unitParams = 'imperial';
    const apiParams = true;
    let params = '?';
    if (latParams) params += `lat=${latParams}`;
    if (lonParams) params += `&lon=${lonParams}`;
    if (unitParams) params += `&units=${unitParams}`;
    if (apiParams) params += `&appid=${OPENWEATHER_KEY}`;

    const url = root + params;
    const response = await axios.get(url);
    return response.data;
  })
}