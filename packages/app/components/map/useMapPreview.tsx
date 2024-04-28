import {
  getShapeSourceBounds,
  isLineString,
  isPolygonOrMultiPolygon,
  processShapeData,
  isPoint,
} from '../../utils/mapFunctions';
import { api } from '../../constants/api';
import { useState, useEffect } from 'react';

const useProcessedShape = (shape) => {
  const [processedShape, setProcessedShape] = useState(null);

  useEffect(() => {
    const processed = processShapeData(shape);
    setProcessedShape(processed);
  }, [shape]);

  return processedShape;
};

const useMapPreviewData = (shape, processedShape) => {
  const [mapPreviewData, setMapPreviewData] = useState(null);
  console.log('mappreiveshape shape', processedShape, shape)

  useEffect(() => {
    if (!processedShape) return;

    const lineProperties = {
      stroke: '#16b22d',
      'stroke-width': 4,
      'stroke-opacity': 1,
    };
    const pointProperties = {
      'marker-color': '#16b22d',
    };

    if (isLineString(shape)) {
      shape.features[0].properties = lineProperties;
    }

    const imageShape = { type: 'FeatureCollection', features: [] };

    const polygonObj = {
      ...shape.features[0],
      geometry: {
        type: shape.features[0].geometry.type,
        coordinates: [shape.features[0].geometry.coordinates[0]],
      },
    };
    console.log('polygonObj polygonObj', polygonObj)
    if (isPolygonOrMultiPolygon(shape)) {
      imageShape.features.push([shape.features[0].geometry.coordinates[0]]);
    } else {
      imageShape.features.push(shape.features[0]);
    }

    processedShape.features.forEach((feature) => {
      if (feature.properties.meta == 'end') {
        feature.properties = pointProperties;
        imageShape.features.push(feature);
      }
    });

    const urlEncodedImageShapeGeoJSON = encodeURIComponent(
      JSON.stringify(imageShape, null, 0),
    );

    console.log('urlEncodedImageShapeGeoJSONurlEncodedImageShapeGeoJSON', urlEncodedImageShapeGeoJSON)

    let bounds = getShapeSourceBounds(shape);
    console.log('bounds bounds', bounds)
    bounds = bounds[0].concat(bounds[1]);
    

    const {
      coordinates: [lng, lat],
    } = shape.features[0].geometry;

    const mapPreviewEndpoint = `${api}/mapPreview`;
    console.log('mapPreviewEndpointmapPreviewEndpoint', mapPreviewEndpoint)

    const data = {
      isPoint: isPoint(shape),
      uri: isPoint(shape)
        ? `${mapPreviewEndpoint}/pin-s+db4848(${lng},${lat})/${lng},${lat},8.63,0/900x400`
        : `${mapPreviewEndpoint}/geojson(${urlEncodedImageShapeGeoJSON})/[${bounds.join(
            ',',
          )}]/900x400?padding=50,30,30,30`,
    };
    console.log('datadatadatadata', data )
    setMapPreviewData(data);
  }, [shape, processedShape]);

  return mapPreviewData;
};

export { useProcessedShape, useMapPreviewData };
