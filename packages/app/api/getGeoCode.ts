import { api } from '../constants/api';

/**
 * Retrieves the geocode for a given address array.
 *
 * @param {string[]} addressArray - An array of addresses to retrieve the geocode for.
 * @return {Promise<any>} A promise that resolves with the geocode result.
 */
export const getGeoCode = async (addressArray: string[]): Promise<any> => {
  let resultReturn: any;
  await fetch(`${api}/geocode?addressArray=${addressArray.join(',')}`)
    .then(async (response) => await response.json())
    .then((result) => {
      resultReturn = result;
    })
    .catch((error) => {
      
    });

  return resultReturn;
};
