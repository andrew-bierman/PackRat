import { X_RAPIDAPI_KEY } from '@env';
import axios from '~/config/axios';
import osmtogeojson from 'osmtogeojson';

/**
 * Retrieves trails data rapidly using the specified location parameters.
 *
 * @param {Object} locationObject - The object containing location data.
 * @param {number} latParams - The latitude parameters.
 * @param {number} lonParams - The longitude parameters.
 * @return {Array} An array of trail names.
 */
export const getTrailsRapid = async (locationObject, latParams, lonParams) => {
  let trailsArray = [];

  await fetch(api + '/gettrails', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...locationObject,
      latitude: latParams,
      longitude: lonParams,
    }),
  })
    .then(async (res) => await res.json())
    .then((json) => {
      Object.values(json).forEach((item) => {
        trailsArray.push(item);
      });
    })
    .catch((err) => {
      console.log('message====>' + err.message);
      console.error('error:' + err);
    });

  if (trailsArray[1] !== undefined) {
    trailsArray = trailsArray[1]?.map((trail) => trail.name);
  } else {
    trailsArray = [];
  }

  return trailsArray;
};

/**
 * Retrieves trails data from OpenStreetMap (OSM) based on the provided latitude and longitude.
 *
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @return {object} The trails data in GeoJSON format.
 */
export const getTrailsOSM = async (lat, lon) => {
  const radius = 50000; // Search radius in meters
  const query = `
  [out:json][timeout:25];
  (
    way["highway"~"footway"]["name"](around:${radius},${lat},${lon});
  );
  (._;>;);
  out tags geom qt;
  `;
  const overpassUrl = 'https://overpass-api.de/api/interpreter'; // change to server on merge

  try {
    const response = await axios.post(overpassUrl, query, {
      headers: { 'Content-Type': 'text/plain' },
    });
    // Convert the response data to GeoJSON format
    const geojsonData = osmtogeojson(response.data);

    return geojsonData;
  } catch (error) {
    console.error('Error fetching trails:', error);
  }
};
