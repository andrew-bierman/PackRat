import { updateDatabaseWithGeoJSONDataFromOverpass } from '../../controllers/getOsm';
import osmtogeojson from 'osmtogeojson';
import axios from 'axios';

export async function getParksOSMService(lat, lon, radius) {
  const overpassUrl = process.env.OSM_URI;
  const overpassQuery = `
        [out:json][timeout:25];
        (
          way["leisure"~"park|nature_reserve|garden|recreation_ground"](around:${radius},${lat},${lon});
        );
        (._;>;);
        out tags geom qt;
        `;

  const response = await axios.post(overpassUrl, overpassQuery, {
    headers: { 'Content-Type': 'text/plain' },
  });
  const geojsonData = osmtogeojson(response.data);

  updateDatabaseWithGeoJSONDataFromOverpass(geojsonData);

  return geojsonData;
}
