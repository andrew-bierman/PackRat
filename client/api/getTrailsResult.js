// import { Geoapify_Key } from "../constants/api";
import { GEOAPIFY_KEY } from '@env';
import axios from '~/config/axios';

/**
 * Retrieves the trails result based on the given address array.
 *
 * @param {Array} addressArray - An array of addresses.
 * @return {Array} An array of trail names.
 */
export const getTrailsResult = async (addressArray) => {
  const params = {
    q: addressArray,
    osm_tag: ['highway:footway'],
  };
  const queryString = Object.entries(params)
    .flatMap(([key, values]) =>
      Array.isArray(values)
        ? values.map((val) => `${key}=${val}`)
        : `${key}=${values}`,
    )
    .join('&');

  const response = await axios.get(
    `https://photon.komoot.io/api/?${queryString}`,
  );

  trailsArray = response.data.features.map((_item) => _item?.properties?.name);
  return trailsArray;
};
