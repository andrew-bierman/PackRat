import { Image } from "native-base";
import {
  getShapeSourceBounds,
  processShapeData,
} from "../../utils/mapFunctions";
import { MAPBOX_ACCESS_TOKEN } from "@env";

export default function MapPreview({ shape }) {
  const processedShape = processShapeData(shape);
  const lineProperties = {
    stroke: "#16b22d",
    "stroke-width": 4,
    "stroke-opacity": 1,
  };
  const pointProperties = {
    "marker-color": "#16b22d",
  };
  shape.features[0].properties = lineProperties;

  const imageShape = { type: "FeatureCollection", features: [] };
  imageShape.features.push(shape.features[0]);
  processedShape.features.forEach((feature) => {
    if (feature.properties.meta == "end") {
      feature.properties = pointProperties;
      imageShape.features.push(feature);
    }
  });

  const urlEncodedImageShapeGeoJSON = encodeURIComponent(
    JSON.stringify(imageShape, null, 0)
  );

  let bounds = getShapeSourceBounds(shape);
  bounds = bounds[0].concat(bounds[1]);

  return (
    <Image
      style={{
        width: "100%",
        height: "100%",
      }}
      source={{
        uri: `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/geojson(${urlEncodedImageShapeGeoJSON})/[${bounds.join(
          ","
        )}]/900x400?access_token=${MAPBOX_ACCESS_TOKEN}&padding=50,30,30,30`,
      }}
    />
  );
}
