import axios from 'app/config/axios';

/**
 * Retrieves the trails result based on the given address array.
 *
 * @param {string[]} addressArray - An array of addresses.
 * @return {Promise<string[]>} An array of trail names.
 */
export const getTrailsResult = async (
  addressArray: string[],
): Promise<string[]> => {
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

  const trailsArray = response.data.features.map(
    (_item: any) => _item?.properties?.name,
  );
  return trailsArray;
};
