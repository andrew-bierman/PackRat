import osmtogeojson from 'osmtogeojson';
import { updateDatabaseWithGeoJSONDataFromOverpass } from '../../controllers/getOsm/updateDatabaseWithGeoJSONDataFromOverpass';

export async function getTrailsOsmService(osmUri, lat, lon, radius) {
  // set default values for lat, lon, and radius;

  if (!osmUri) {
    throw new Error('OSM_URI is not defined in the environment variables'); // But it is defined so this is okay
  }

  const overpassQuery = `
       [out:json][timeout:25];
       (
         way["highway"~"footway"]["name"](around:${radius},${lat},${lon});
       );
       out tags geom qt;
       `;

  const response = await fetch(osmUri, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: overpassQuery,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const geojsonData = osmtogeojson(data);

  updateDatabaseWithGeoJSONDataFromOverpass(geojsonData);

  return geojsonData;
}
