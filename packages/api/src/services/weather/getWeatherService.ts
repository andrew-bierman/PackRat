import axios from 'axios';

export async function getWeatherService(lat, lon) {
  const root = process.env.WEATHER_URL;
  const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;
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
