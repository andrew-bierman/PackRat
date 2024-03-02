import { api } from '../constants/api';

/**
 * Retrieves weather information based on latitude, longitude, and state.
 *
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @param {string} state - State of the location.
 * @return {Promise<any>} The weather information object.
 */
export const getWeather = async (
  lat: number,
  lon: number,
  state: string,
): Promise<any> => {
  let weatherObject: any = {};

  let params = '?';

  if (lat) params += `lat=${lat}`;
  if (lon) params += `&lon=${lon}`;

  const url = api + '/weather' + params;

  try {
    const response = await fetch(url);
    const json = await response.json();
    weatherObject = json;
  } catch (err) {}

  weatherObject.state = state;
  return weatherObject;
};
