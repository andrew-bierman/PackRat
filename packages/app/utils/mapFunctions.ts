import * as Location from 'expo-location';

const defaultShape = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [-77.044211, 38.852924],
          [-77.045659, 38.860158],
          [-77.044232, 38.862326],
          [-77.040879, 38.865454],
          [-77.039936, 38.867698],
          [-77.040338, 38.86943],
          [-77.04264, 38.872528],
          [-77.03696, 38.878424],
          [-77.032309, 38.87937],
          [-77.030056, 38.880945],
          [-77.027645, 38.881779],
          [-77.026946, 38.882645],
          [-77.026942, 38.885502],
          [-77.028054, 38.887449],
          [-77.02806, 38.892088],
          [-77.03364, 38.892108],
          [-77.033643, 38.899926],
        ],
      },
    },
  ],
};

/**
 * Normalize the coordinates.
 *
 * @param {array} coordinates - The coordinates to be normalized.
 * @return {array} The normalized coordinates.
 */
function normalizeCoordinates(coordinates) {
  // check if coordinates are nested, flip them if so
  if (typeof coordinates[0][0] === 'number') {
    // If first value is greater than 90, it's likely in the format of (longitude, latitude)
    if (coordinates[0][0] > 90) {
      return coordinates.map((coordinate) => [coordinate[1], coordinate[0]]);
    }
    return coordinates;
  }
  // if not nested, nest them
  // If first value is greater than 90, it's likely in the format of (longitude, latitude)
  if (coordinates[0] > 90) {
    return [[coordinates[1], coordinates[0]]];
  }
  return [[coordinates[0], coordinates[1]]];
}

/**
 * Converts a Photon GeoJSON object to a Shape object.
 *
 * @param {object} photonGeoJson - The Photon GeoJSON object to convert.
 * @return {object} The converted Shape object.
 */
function convertPhotonGeoJsonToShape(photonGeoJson) {
  return {
    type: 'FeatureCollection',
    features: [photonGeoJson],
  };
}

/**
 * Calculates the minimum and maximum longitude and latitude coordinates of a given shape.
 *
 * @param {object} shape - The shape object containing the coordinates.
 * @return {array} An array representing the minimum and maximum longitude and latitude coordinates.
 */
function getShapeSourceBounds(shape) {
  let minLng = Infinity;
  let maxLng = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;
  shape.features[0].geometry.coordinates.forEach((coord) => {
    const lng = coord[0];
    const lat = coord[1];

    if (lng < minLng) {
      minLng = lng;
    }
    if (lng > maxLng) {
      maxLng = lng;
    }
    if (lat < minLat) {
      minLat = lat;
    }
    if (lat > maxLat) {
      maxLat = lat;
    }
  });

  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
}

/**
 * Handles the shape source load and calculates the zoom level based on the width and height.
 *
 * @param {object} shape - The shape object containing the coordinates.
 * @param {number} width - The width of the shape.
 * @param {number} height - The height of the shape.
 * @return {number|null} The calculated zoom level or null if there are no coordinates.
 */
function handleShapeSourceLoad(shape, width, height) {
  if (shape?.features[0]?.geometry?.coordinates?.length > 1) {
    let bounds = getShapeSourceBounds(shape);
    if (bounds && bounds[0] && bounds[1]) {
      bounds = [bounds[0].concat(bounds[1])];
      return calculateZoomLevel(bounds[0], { width, height });
    }
  }
  return null;
}

/**
 * Calculates the latitude in radians.
 *
 * @param {number} lat - The latitude in degrees.
 * @return {number} The latitude in radians.
 */
function latRad(lat) {
  const sin = Math.sin((lat * Math.PI) / 180);
  const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
  return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
}

/**
 * Calculates the zoom level of a map based on the size of the map in pixels,
 * the size of the world in pixels, and a fraction.
 *
 * @param {number} mapPx - The size of the map in pixels.
 * @param {number} worldPx - The size of the world in pixels.
 * @param {number} fraction - The fraction used for the calculation.
 * @return {number} The calculated zoom level.
 */
function zoom(mapPx, worldPx, fraction) {
  return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
}

/**
 * Calculates the zoom level for a given map based on the provided bounds and map dimensions.
 *
 * @param {Array} bounds - The bounds of the map in the format [south, west, north, east].
 * @param {Object} mapDim - The dimensions of the map in the format {height: number, width: number}.
 * @return {number} The calculated zoom level for the map.
 */
function calculateZoomLevel(bounds, mapDim) {
  const WORLD_DIM = { height: 256, width: 256 };
  const ne = { lat: bounds[2], lng: bounds[3] };
  const sw = { lat: bounds[0], lng: bounds[1] };

  const latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;

  const lngDiff = ne.lng - sw.lng;
  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

  const latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
  const lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

  return latZoom;
}

/**
 * Finds the center of a trail based on its shape coordinates.
 *
 * @param {object} shape - The shape object containing trail coordinates.
 * @return {array} The center coordinates of the trail.
 */
function findTrailCenter(shape) {
  console.log('Finding trail center...', shape);
  const trailCoords = shape?.features[0]?.geometry?.coordinates;

  // Flatten the coordinates array for Polygon geometries

  let avgLatitude;
  let avgLongitude;
  let flattenedCoords;
  if (trailCoords[0][0] === undefined) {
    avgLongitude = trailCoords[0];
    avgLatitude = trailCoords[1];
  } else if (Array.isArray(trailCoords[0][0][0])) {
    flattenedCoords = trailCoords[0].flat();

    const latitudes = flattenedCoords.map((coord) => coord[1]);
    const longitudes = flattenedCoords.map((coord) => coord[0]);

    avgLatitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
    avgLongitude = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
  } else {
    flattenedCoords = trailCoords[0];

    const latitudes = flattenedCoords.map((coord) => coord[1]);
    const longitudes = flattenedCoords.map((coord) => coord[0]);

    avgLatitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
    avgLongitude = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
  }

  console.log('Average latitude:', avgLatitude);
  console.log('Average longitude:', avgLongitude);

  return [avgLongitude, avgLatitude];
}

/**
 * Process the shape data by transforming LineString features into Points.
 *
 * @param {Object} shape - The shape data to be processed.
 * @return {Object} The processed shape data.
 */
const processShapeData = (shape) => {
  const processedShape = { ...shape };
  processedShape.features = [];

  shape.features.forEach((feature) => {
    if (feature.geometry.type === 'LineString') {
      // Make sure coordinates are in the correct format
      feature.geometry.coordinates = ensure2DArray(
        feature.geometry.coordinates,
      );

      const points = feature.geometry.coordinates.map((coord, index) => {
        return {
          type: 'Feature',
          properties: {
            // Add a `meta` property to the first and last points
            meta:
              index === 0 || index === feature.geometry.coordinates.length - 1
                ? 'end'
                : 'middle',
          },
          geometry: {
            type: 'Point',
            coordinates: coord,
          },
        };
      });

      processedShape.features.push(...points);

      // Keep the original LineString feature
      processedShape.features.push(feature);
    }
  });

  return processedShape;
};

/**
 * Ensure the input array is a 2D array.
 *
 * @param {Array} arr - The input array.
 * @return {Array} - The 2D array.
 */
const ensure2DArray = (arr) => {
  // If the first element of the array is not an array itself, add an additional array layer
  if (!Array.isArray(arr[0])) {
    return [arr];
  }
  // If the array is already 2D, return it as is
  return arr;
};

const mapboxStyles = [
  { label: 'Outdoors', style: 'mapbox://styles/mapbox/outdoors-v11' },
  { label: 'Street', style: 'mapbox://styles/mapbox/streets-v11' },
  { label: 'Light', style: 'mapbox://styles/mapbox/light-v10' },
  { label: 'Dark', style: 'mapbox://styles/mapbox/dark-v10' },
  { label: 'Satellite', style: 'mapbox://styles/mapbox/satellite-v9' },
  {
    label: 'Satellite Street',
    style: 'mapbox://styles/mapbox/satellite-streets-v11',
  },
];

/**
 * Retrieves the current location asynchronously.
 *
 * @return {Promise<Location>} The current location object.
 */
const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    alert('Permission to access location was denied');
    return;
  }

  const location = await Location.getCurrentPositionAsync({});

  return location;
};

/**
 * Checks if a shape is downloadable.
 *
 * @param {Object} shape - The shape object to check.
 * @return {boolean} Returns true if the shape is downloadable, false otherwise.
 */
const isShapeDownloadable = (shape) => {
  return shape?.features[0]?.geometry?.coordinates?.length > 1;
};

/**
 * Checks if the given shape is a point.
 *
 * @param {Object} shape - The shape object to be checked.
 * @return {boolean} Returns true if the shape is a point, otherwise returns false.
 */
const isPoint = (shape) => {
  return shape?.features[0]?.geometry?.type === 'Point';
};
/**
 * Checks if the given shape is a LineString.
 *
 * @param {Object} shape - The shape object to be checked.
 * @return {boolean} Returns true if the shape is a LineString, otherwise false.
 */
const isLineString = (shape) => {
  return shape?.features[0]?.geometry?.type === 'LineString';
};

/**
 * Checks if the given shape is a Polygon or MultiPolygon.
 *
 * @param {object} shape - The shape object to be checked.
 * @return {boolean} Returns true if the shape is a Polygon or MultiPolygon, otherwise returns false.
 */
const isPolygonOrMultiPolygon = (shape) => {
  return (
    shape?.features[0]?.geometry?.type === 'MultiPolygon' ||
    shape?.features[0]?.geometry?.type === 'MultiPolygon'
  );
};

/**
 * Calculates the bounds of a multipolygon.
 *
 * @param {object} multipolygonData - The multipolygon data.
 * @return {array} The center longitude and latitude of the bounds.
 */
const multiPolygonBounds = (multipolygonData) => {
  let coordinates = multipolygonData.geometry.coordinates[0];
  if (multipolygonData.geometry.type === 'MultiPolygon') {
    coordinates = coordinates[0];
  }
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const [lng, lat] of coordinates) {
    minX = Math.min(minX, lng);
    maxX = Math.max(maxX, lng);
    minY = Math.min(minY, lat);
    maxY = Math.max(maxY, lat);
  }

  const centerLng = (minX + maxX) / 2;
  const centerLat = (minY + maxY) / 2;

  return [centerLng, centerLat];
};

const validateCoordinates = (coordinates: any) => {
  if (!Array.isArray(coordinates)) {
    throw new Error('Invalid coordinates: Must be an array.');
  }
  coordinates.forEach((coord) => {
    if (!Array.isArray(coord)) {
      if (typeof coord !== 'number') {
        throw new Error(
          'Invalid coordinates: Each coordinate must be a number.',
        );
      }
    } else {
      validateCoordinates(coord);
    }
  });
};

const validateGeoJSON = (geojson: any) => {
  if (!geojson || typeof geojson !== 'object') {
    throw new Error('Invalid GeoJSON: Data is not an object.');
  }
  if (!geojson.type) {
    throw new Error('Invalid GeoJSON: Missing "type" property.');
  }
  if (!geojson.features || !Array.isArray(geojson.features)) {
    throw new Error('Invalid GeoJSON: Missing or invalid "features" property.');
  }

  geojson.features.forEach((feature) => {
    if (feature.geometry && feature.geometry.coordinates) {
      if (feature.geometry.type === 'Point') {
        validateCoordinates(feature.geometry.coordinates);
      } else if (
        feature.geometry.type === 'LineString' ||
        feature.geometry.type === 'Polygon'
      ) {
        feature.geometry.coordinates.forEach(validateCoordinates);
      } else if (feature.geometry.type === 'MultiPolygon') {
        feature.geometry.coordinates.forEach((polygon) => {
          polygon.forEach(validateCoordinates);
        });
      }
    }
  });
};

const validateShape = (shape: any) => {
  try {
    validateGeoJSON(shape);
  } catch (error) {
    throw new Error(`Invalid shape: ${error.message}`);
  }
};

export {
  defaultShape,
  getShapeSourceBounds,
  handleShapeSourceLoad,
  latRad,
  zoom,
  calculateZoomLevel,
  findTrailCenter,
  processShapeData,
  mapboxStyles,
  getLocation,
  isShapeDownloadable,
  convertPhotonGeoJsonToShape,
  isPoint,
  isLineString,
  isPolygonOrMultiPolygon,
  multiPolygonBounds,
  validateGeoJSON,
  validateShape,
  validateCoordinates,
};
