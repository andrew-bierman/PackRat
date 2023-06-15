import * as Location from "expo-location";

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
  const latitudes = trailCoords.map((coord) => coord[0]);
  const longitudes = trailCoords.map((coord) => coord[1]);
  const avgLatitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
  const avgLongitude =
    longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
  return [avgLatitude, avgLongitude];
}

const processShapeData = (shape) => {
  let processedShape = { ...shape };
  processedShape.features = [];

  shape.features.forEach((feature) => {
    if (feature.geometry.type === "LineString") {
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


export {
  defaultShape,
  getShapeSourceBounds,
  handleShapeSourceLoad,
  latRad,
  zoom,
  calculateZoomLevel,
  findTrailCenter,
  processShapeData,
};
