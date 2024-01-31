export const parseCoordinates = (geoJson) => {
  let lon = 0;
  let lat = 0;

  const findDeepestArray = (arr) => {
    if (Array.isArray(arr[0])) {
      return findDeepestArray(arr[0]);
    } else {
      return arr;
    }
  };

  if (geoJson?.features) {
    const { coordinates } = geoJson.features[0].geometry;
    if (coordinates[0]) {
      const deepestArray = findDeepestArray(coordinates);
      [lon, lat] = deepestArray;
    }
  }
  // If the geoJson object is a single 'Feature' type
  else if (geoJson?.type === 'Feature' && geoJson?.geometry?.type === 'Point') {
    const { coordinates } = geoJson.geometry;
    if (coordinates[0]) {
      const deepestArray = findDeepestArray(coordinates);
      [lon, lat] = deepestArray;
    }
  }

  return { lat, lon };
};
