import { api } from '../constants/api';

/**
 * Retrieves the geocode for a given address array.
 *
 * @param {Array} addressArray - An array of addresses to retrieve the geocode for.
 * @return {Promise} A promise that resolves with the geocode result.
 */
export const getGeoCode = async (addressArray) => {
  let resultReturn;
  await fetch(`${api}/geocode?addressArray=${addressArray}`)
    .then(async (response) => await response.json())
    .then((result) => {
      resultReturn = result;
    })
    .catch((error) => {
      console.log('error', error);
    });

  return resultReturn;
};
