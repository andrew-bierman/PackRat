import osmtogeojson from 'osmtogeojson';
import axios from 'axios';

export async function getPhotonDetailsService(id, type) {
  type = type.toLowerCase(); // Standardize osm_type to be lowercase

  switch (type) {
    case 'way':
    case 'w':
      type = 'way';
      break;
    case 'node':
    case 'n':
      type = 'node';
      break;
    case 'relation':
    case 'r':
      type = 'relation';
      break;
    default:
      break;
  }

  const overpassUrl = process.env.OSM_URI;

  const overpassQuery = `[out:json][timeout:25];${type}(${id});(._;>;);out body;`;

  const response = await axios.post(overpassUrl, overpassQuery, {
    headers: { 'Content-Type': 'text/plain' },
  });

  // console.log("response", response);

  const geojsonData = osmtogeojson(response.data);
  return geojsonData;
}
