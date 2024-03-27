import { api } from '../constants/api';
import abbrRegion from '../constants/convertStateToAbbr';
import axios from '~/config/axios';
import osmtogeojson from 'osmtogeojson';

/**
 * Retrieves parks information for a given state.
 *
 * @param {string} state - The abbreviation of the state to retrieve parks for.
 * @return {Array<string>} An array of park names.
 */
export const getParksRapid = async (state) => {
  let parksArray = [];
  const abbrState = abbrRegion(state, 'abbr') ?? '';
  if (abbrState) {
    await fetch(`${api}/getparks?abbrState=${abbrState}`)
      .then(async (res) => await res.json())
      .then((json) => {
        json.data.forEach((item) => {
          parksArray.push(item);
        });
      })
      .catch((err) => {
        console.error('error:' + err);
      });
  }
  if (parksArray.length > 0) {
    parksArray = parksArray.map((park) => park.name);
  } else {
    parksArray = [];
  }

  return parksArray;
};

/**
 * Retrieves parks from OpenStreetMap (OSM) based on latitude and longitude coordinates.
 *
 * @param {number} lat - The latitude coordinate.
 * @param {number} lon - The longitude coordinate.
 * @return {Promise<Object>} The geojson data containing the parks.
 */
export const getParksOSM = async (lat, lon) => {
  const radius = 50000; // Search radius in meters
  const query = `
    [out:json][timeout:25];
    (
      way["leisure"="park"]["name"](around:${radius},${lat},${lon});
      relation["leisure"="park"]["name"](around:${radius},${lat},${lon});
    );
    (._;>;);
    out tags geom qt;
  `;
  const overpassUrl = 'https://overpass-api.de/api/interpreter';

  try {
    const response = await axios.post(overpassUrl, query, {
      headers: { 'Content-Type': 'text/plain' },
    });
    const geojsonData = osmtogeojson(response.data);
    return geojsonData;
  } catch (error) {
    console.error('Error fetching parks:', error);
  }
};
