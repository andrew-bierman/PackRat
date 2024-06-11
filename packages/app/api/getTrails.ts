import axios from 'app/config/axios';
import { api } from 'constants/api';
import osmtogeojson from 'osmtogeojson';

/**
 * Retrieves trails data rapidly using the specified location parameters.
 *
 * @param {Object} locationObject - The object containing location data.
 * @param {number} latParams - The latitude parameters.
 * @param {number} lonParams - The longitude parameters.
 * @return {Promise<string[]>} An array of trail names.
 */
export const getTrailsRapid = async (
  locationObject: any,
  latParams: number,
  lonParams: number,
): Promise<string[]> => {
  let trailsArray: string[] = [];

  try {
    const response = await fetch(api + '/gettrails', {
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
    });

    const json = await response.json();

    Object.values(json).forEach((item: any) => {
      trailsArray.push(item);
    });

    if (trailsArray[1] !== undefined) {
      trailsArray = trailsArray.map((trail: any) => trail.name);
    } else {
      trailsArray = [];
    }

    return trailsArray;
  } catch (error) {
    console.error('error:' + error);
    return [];
  }
};

/**
 * Retrieves trails data from OpenStreetMap (OSM) based on the provided latitude and longitude.
 *
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @return {Promise<object>} The trails data in GeoJSON format.
 */
export const getTrailsOSM = async (
  lat: number,
  lon: number,
): Promise<object> => {
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
    return {};
  }
};
