import { updateDatabaseWithGeoJSONDataFromOverpass } from '../../controllers/getOsm';
import osmtogeojson from 'osmtogeojson';

export async function getParksOSMService(lat, lon, radius, osmUri) {
  const overpassUrl = osmUri;
  const overpassQuery = `
        [out:json][timeout:25];
        (
          way["leisure"~"park|nature_reserve|garden|recreation_ground"](around:${radius},${lat},${lon});
        );
        (._;>;);
        out tags geom qt;
        `;

  const response = await fetch(overpassUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: overpassQuery,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const geojsonData = osmtogeojson(data);
  // console.log('geojsonData==============', geojsonData);

  updateDatabaseWithGeoJSONDataFromOverpass(geojsonData);

  return geojsonData;
}
