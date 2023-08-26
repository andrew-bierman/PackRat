import axios from '~/config/axios';

// TODO - swap to RTK query

/**
 * Retrieves photon results based on the provided address array.
 *
 * @param {Array} addressArray - An array of addresses.
 * @return {Array} An array of photon results.
 */
export const getPhotonResults = async (addressArray) => {
  if (!addressArray) return;

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

  const response = await axios.get(
    `https://photon.komoot.io/api/?${queryString}`,
  );

  //   const trailsArray = response.data.features.map((_item) => _item?.properties?.name);

  const resultsArray = response.data.features;

  return resultsArray;
};
