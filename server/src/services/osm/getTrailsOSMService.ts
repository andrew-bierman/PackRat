import osmtogeojson from 'osmtogeojson';
import axios from 'axios';
import { updateDatabaseWithGeoJSONDataFromOverpass } from '../../controllers/getOsm/updateDatabaseWithGeoJSONDataFromOverpass';

export async function getTrailsOsmService(lat, lon, radius) {
  // set default values for lat, lon, and radius
  const overpassUrl = process.env.OSM_URI;

  const overpassQuery = `
       [out:json][timeout:25];
       (
         way["highway"~"footway"]["name"](around:${radius},${lat},${lon});
       );
       out tags geom qt;
       `;

  const response = await axios.post(overpassUrl, overpassQuery, {
    headers: { 'Content-Type': 'text/plain' },
  });
  const geojsonData = osmtogeojson(response.data);

  updateDatabaseWithGeoJSONDataFromOverpass(geojsonData);

  return geojsonData;
}
