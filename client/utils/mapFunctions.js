import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

const defaultShape = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
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

function normalizeCoordinates(coordinates) {
  // check if coordinates are nested, flip them if so
  if (typeof coordinates[0][0] === "number") {
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

function convertPhotonGeoJsonToShape(photonGeoJson) {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: normalizeCoordinates(photonGeoJson.geometry.coordinates),
        },
        properties: photonGeoJson.properties,
      },
    ],
  };
}

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

function handleShapeSourceLoad(width, height) {
  if (shape?.features[0]?.geometry?.coordinates?.length > 1) {
    let bounds = getShapeSourceBounds(shape);
    bounds = bounds[0].concat(bounds[1]);
    return calculateZoomLevel(bounds, { width, height });
  }
  return null;
}

function latRad(lat) {
  var sin = Math.sin((lat * Math.PI) / 180);
  var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
  return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
}

function zoom(mapPx, worldPx, fraction) {
  return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
}

function calculateZoomLevel(bounds, mapDim) {
  var WORLD_DIM = { height: 256, width: 256 };
  let ne = { lat: bounds[2], lng: bounds[3] };
  let sw = { lat: bounds[0], lng: bounds[1] };

  var latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;

  var lngDiff = ne.lng - sw.lng;
  var lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

  var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
  var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

  return latZoom;
}

function findTrailCenter(shape) {
  const trailCoords = shape?.features[0]?.geometry?.coordinates;

  console.log("trailCoords", trailCoords);
  console.log("trailCoords.length", trailCoords.length);

  let latitudes;
  let longitudes;

  // Handle the case where there's only one pair of coordinates
  if (trailCoords.length === 1) {
    console.log(
      "Single coordinate found, using as trail center.",
      trailCoords[0]
    );
    return trailCoords[0];
  }

  if (Array.isArray(trailCoords[0][0])) {
    // If the coordinates are in the format: [[[lat, lng]], [[lat, lng]], ...]
    latitudes = trailCoords.map((coord) => coord[0][0]);
    longitudes = trailCoords.map((coord) => coord[0][1]);
  } else {
    // If the coordinates are in the format: [[lat, lng], [lat, lng], ...]
    latitudes = trailCoords.map((coord) => coord[0]);
    longitudes = trailCoords.map((coord) => coord[1]);
  }

  const avgLatitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
  const avgLongitude = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

  console.log("trailCords return", [avgLatitude, avgLongitude]);

  return [avgLatitude, avgLongitude];
}

const processShapeData = (shape) => {
  let processedShape = { ...shape };
  processedShape.features = [];

  shape.features.forEach((feature) => {
    if (feature.geometry.type === "LineString") {
      // Make sure coordinates are in the correct format
      feature.geometry.coordinates = ensure2DArray(
        feature.geometry.coordinates
      );

      let points = feature.geometry.coordinates.map((coord, index) => {
        return {
          type: "Feature",
          properties: {
            // Add a `meta` property to the first and last points
            meta:
              index === 0 || index === feature.geometry.coordinates.length - 1
                ? "end"
                : "middle",
          },
          geometry: {
            type: "Point",
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

const ensure2DArray = (arr) => {
  // If the first element of the array is not an array itself, add an additional array layer
  if (!Array.isArray(arr[0])) {
    return [arr];
  }
  // If the array is already 2D, return it as is
  return arr;
};

const mapboxStyles = [
  { label: "Outdoors", style: "mapbox://styles/mapbox/outdoors-v11" },
  { label: "Street", style: "mapbox://styles/mapbox/streets-v11" },
  { label: "Light", style: "mapbox://styles/mapbox/light-v10" },
  { label: "Dark", style: "mapbox://styles/mapbox/dark-v10" },
  { label: "Satellite", style: "mapbox://styles/mapbox/satellite-v9" },
  {
    label: "Satellite Street",
    style: "mapbox://styles/mapbox/satellite-streets-v11",
  },
];

const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    alert("Permission to access location was denied");
    return;
  }

  let location = await Location.getCurrentPositionAsync({});

  return location;
};

const isShapeDownloadable = (shape) => {
  return shape?.features[0]?.geometry?.coordinates?.length > 1;
};

const DESTINATION = 'destination'
const TRIP= 'trip';
const isPoint = (shape) => {
  return shape?.features[0]?.geometry?.type === 'Point';
}
const isLineString = (shape) => {
  return shape?.features[0]?.geometry?.type === 'LineString';
}

const isPolygonOrMultiPolygon = (shape) => {
  return shape?.features[0]?.geometry?.type === 'MultiPolygon' || shape?.features[0]?.geometry?.type === 'MultiPolygon';
}

const multiPolygonBounds = (multipolygonData) => {
  let coordinates = multipolygonData.geometry.coordinates[0];
  if(multipolygonData.geometry.type === 'MultiPolygon') {
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
  console.log(centerLat, centerLng, 'center lng lat');
  return [centerLng, centerLat]
}

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
  multiPolygonBounds
};
