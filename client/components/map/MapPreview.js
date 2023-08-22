import { Image } from "native-base";
import {
  getShapeSourceBounds,
  isLineString,
  isPolygonOrMultiPolygon,
  processShapeData,
} from "../../utils/mapFunctions";
import { isPoint } from "../../utils/mapFunctions";
import { api } from "../../constants/api";

/**
 * Renders a preview of a map based on the given shape.
 *
 * @param {Object} shape - The shape object describing the map.
 * @return {Component} The rendered map preview.
 */

export default function MapPreview({ shape }) {
  console.log(
    "🚀 ~ file: MapPreview.js:9 ~ MapPreview ~ shape:",
    JSON.stringify(shape.features[0])
  );
  const processedShape = processShapeData(shape);
  const lineProperties = {
    stroke: "#16b22d",
    "stroke-width": 4,
    "stroke-opacity": 1,
  };
  const pointProperties = {
    "marker-color": "#16b22d",
  };
  if (isLineString(shape)) shape.features[0].properties = lineProperties;

  const imageShape = { type: "FeatureCollection", features: [] };
  console.log(JSON.stringify(shape.features[0]));
  const polygonObj = {
    ...shape.features[0],
    geometry: {
      type: shape.features[0].geometry.type,
      coordinates: [shape.features[0].geometry.coordinates[0]],
    },
  };
  console.log(JSON.stringify(polygonObj), "polygon obj");
  if (isPolygonOrMultiPolygon(shape)) {
    imageShape.features.push([shape.features[0].geometry.coordinates[0]]);
  } else {
    imageShape.features.push(shape.features[0]);
  }
  processedShape.features.forEach((feature) => {
    if (feature.properties.meta == "end") {
      feature.properties = pointProperties;
      imageShape.features.push(feature);
    }
  });

  const urlEncodedImageShapeGeoJSON = encodeURIComponent(
    JSON.stringify(imageShape, null, 0)
  );
  console.log(
    "🚀 ~ file: MapPreview.js:33 ~ MapPreview ~ urlEncodedImageShapeGeoJSON:",
    imageShape.features
  );

  let bounds = getShapeSourceBounds(shape);
  bounds = bounds[0].concat(bounds[1]);
  // console.log("🚀 ~ file: MapPreview.js:34 ~ MapPreview ~ bounds:", bounds)

  const {
    coordinates: [lng, lat],
  } = shape.features[0].geometry;
  // console.log("🚀 ~ file: MapPreview.js:39 ~ MapPreview ~ coordinates:", isPoint(shape),MAPBOX_ACCESS_TOKEN)

  const mapPreviewEndpoint = `${api}/map/static`;

  return isPoint(shape) ? (
    <Image
      style={{
        width: "100%",
        height: "100%",
      }}
      source={{
        uri: `${mapPreviewEndpoint}/pin-s+db4848(${lng},${lat})/${lng},${lat},8.63,0/900x400`,
      }}
    />
  ) : (
    <Image
      style={{
        width: "100%",
        height: "100%",
      }}
      source={{
        uri: `${mapPreviewEndpoint}/geojson(${urlEncodedImageShapeGeoJSON})/[${bounds.join(
          ","
        )}]/900x400?padding=50,30,30,30`,
      }}
    />
  );
}
