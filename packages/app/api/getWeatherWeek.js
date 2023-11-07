import { api } from '../constants/api';

/**
 * Retrieves the weather forecast for a specific location for the next week.
 *
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @return {Array} The weather forecast for the next four days.
 */
export const getWeatherWeek = async (lat, lon) => {
  let weatherObject = {};

  let params = '?';

  const latParams = lat;
  const lonParams = lon;

  if (latParams) params += `lat=${latParams}`;
  if (lonParams) params += `&lon=${lonParams}`;

  const url = api + '/weather/week' + params;

  await fetch(url)
    .then(async (res) => await res.json())
    .then((json) => {
      weatherObject = json;
    })
    .catch((err) => {
      console.log('error:' + err);
    });

  return weatherObject.list.slice(0, 4);
};
