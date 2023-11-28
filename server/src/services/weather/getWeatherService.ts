export async function getWeatherService(weatherUrl, openWeatherKey, lat, lon) {
  const root = weatherUrl;
  const OPENWEATHER_KEY = openWeatherKey;
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
