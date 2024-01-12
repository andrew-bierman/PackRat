import axios from '../config/axios';

/**
 * Retrieves photon results based on the provided address array.
 *
 * @param {string[]} addressArray - An array of addresses.
 * @return {Promise<any[]>} An array of photon results.
 */
export const getPhotonResults = async (
  addressArray: string[],
): Promise<any[]> => {
  if (!addressArray) return [];

  const params = {
    q: addressArray,
    osm_tag: ['highway:footway', 'highway:cycleway', 'place'],
    // osm_tag: "highway:footway",
    // osm_tag: "highway:cycleway",
    // osm_tag: "place",
  };

  const queryString = Object.entries(params)
    .flatMap(([key, values]) =>
      Array.isArray(values)
        ? values.map((val) => `${key}=${val}`)
        : `${key}=${values}`,
    )
    .join('&');

  try {
    const response = await axios.get(
      `https://photon.komoot.io/api/?${queryString}`,
    );

    const resultsArray = response.data.features;
    return resultsArray;
  } catch (error) {
    console.error('Error fetching photon results:', error);
    return [];
  }
};
