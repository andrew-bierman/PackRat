import { useState, useEffect } from 'react';
import {
  getShapeSourceBounds,
  isLineString,
  isPolygonOrMultiPolygon,
  processShapeData,
  isPoint,
} from '../../utils/mapFunctions';

export const useProcessedShape = (shape) => {
  const [processedShape, setProcessedShape] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [isPointShape, setIsPointShape] = useState(false);

  useEffect(() => {
    const processed = processShapeData(shape);
    setProcessedShape(processed);

    const bounds = getShapeSourceBounds(shape);
    setBounds(bounds[0].concat(bounds[1]));

    setIsPointShape(isPoint(shape));
  }, [shape]);

  return { processedShape, bounds, isPointShape };
};
