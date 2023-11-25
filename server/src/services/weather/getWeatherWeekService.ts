export async function getWeatherWeekService(env, lat, lon) {
  const root = env.WEATHER_WEEK_URL;
  const OPENWEATHER_KEY = env.OPENWEATHER_KEY;
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
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
