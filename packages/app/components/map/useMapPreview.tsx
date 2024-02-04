import { useState, useEffect } from 'react';
import {
  getShapeSourceBounds,
  isLineString,
  isPolygonOrMultiPolygon,
  processShapeData,
  isPoint,
} from '../../utils/mapFunctions';

export const useMapPreview = (shape) => {
  const [imageShape, setImageShape] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const processedShape = processShapeData(shape);
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

    const tempImageShape = { type: 'FeatureCollection', features: [] };
    const polygonObj = {
      ...shape.features[0],
      geometry: {
        type: shape.features[0].geometry.type,
        coordinates: [shape.features[0].geometry.coordinates[0]],
      },
    };
    if (isPolygonOrMultiPolygon(shape)) {
      tempImageShape.features.push([shape.features[0].geometry.coordinates[0]]);
    } else {
      tempImageShape.features.push(shape.features[0]);
    }
    processedShape.features.forEach((feature) => {
      if (feature.properties.meta == 'end') {
        feature.properties = pointProperties;
        tempImageShape.features.push(feature);
      }
    });

    setImageShape(tempImageShape);
    setBounds(
      getShapeSourceBounds(shape)[0].concat(getShapeSourceBounds(shape)[1]),
    );
    setCoordinates(shape.features[0].geometry.coordinates);
  }, [shape]);

  return { imageShape, bounds, coordinates, isPoint: isPoint(shape) };
};
