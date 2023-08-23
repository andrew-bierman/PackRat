import axios from "axios";
import { RetrievingWeatherFromOpenWeatherError } from "../../helpers/errors";
import { responseHandler } from "../../helpers/responseHandler";

/**
 * Retrieves the weather forecast for the week based on latitude and longitude parameters.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<Object>} the weather data for the week
 */
export const getWeatherWeek = async (req, res,next) => {
  const root = process.env.WEATHER_WEEK_URL;
  const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;
  const latParams = req.query.lat;
  const lonParams = req.query.lon;
  const unitParams = "imperial";
  const apiParams = true;

  let params = `?`;
  if (latParams) params += `lat=${latParams}`;
  if (lonParams) params += `&lon=${lonParams}`;
  if (unitParams) params += `&units=${unitParams}`;
  if (apiParams) params += `&appid=${OPENWEATHER_KEY}`;

  const url = root + params;

  console.log("url", url);

  try {
    const response = await axios.get(url);
    // console.log(response.data);
    res.locals.data = response.data;
    responseHandler(res);
  } catch (error) {
    next(RetrievingWeatherFromOpenWeatherError)
  }
};