import osmtogeojson from 'osmtogeojson';

export async function getPhotonDetailsService(id, type, osmUri) {
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

  const overpassQuery = `[out:json][timeout:25];${type}(${id});(._;>;);out body;`;

  console.log('overpassQuery', overpassQuery, osmUri);
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
  return geojsonData;
}
