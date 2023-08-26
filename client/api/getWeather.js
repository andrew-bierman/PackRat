import { api } from '../constants/api';

/**
 * Retrieves weather information based on latitude, longitude, and state.
 *
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @param {string} state - State of the location.
 * @return {Object} The weather information object.
 */
export const getWeather = async (lat, lon, state) => {
  let weatherObject = {};

  let params = '?';

  if (lat) params += `lat=${lat}`;
  if (lon) params += `&lon=${lon}`;

  const url = api + '/weather' + params;

  await fetch(url)
    .then(async (res) => await res.json())
    .then((json) => {
      weatherObject = json;
    })
    .catch((err) => {
      console.error('error:' + err);
    });

  weatherObject.state = state;
  return weatherObject;
};
