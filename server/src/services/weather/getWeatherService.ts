import axios from 'axios';

export async function getWeatherService(lat, lon) {
  const root = process.env.WEATHER_URL;
  console.log("🚀 ~ file: getWeatherService.ts:5 ~ getWeatherService ~ root:", root)
  const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;
  console.log("🚀 ~ file: getWeatherService.ts:7 ~ getWeatherService ~ OPENWEATHER_KEY:", OPENWEATHER_KEY)
  const latParams = lat;
  const lonParams = lon;
  const unitParams = 'imperial';
  const apiParams = true;
  let params = '?';
  if (latParams) params += `lat=${latParams}`;
  if (lonParams) params += `&lon=${lonParams}`;
  if (unitParams) params += `&units=${unitParams}`;
  if (apiParams) params += `&appid=${OPENWEATHER_KEY}`;

  const url = root + params;
  const response = await axios.get(url);
  return response;
}
