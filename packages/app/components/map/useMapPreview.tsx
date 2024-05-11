import {
  getShapeSourceBounds,
  isLineString,
  isPolygonOrMultiPolygon,
  processShapeData,
  isPoint,
  isShapeDownloadable,
} from '../../utils/mapFunctions';
import { api } from '../../constants/api';
import { useState, useEffect } from 'react';
import simplify from 'simplify-geojson';

const useProcessedShape = (shape) => {
  const [processedShape, setProcessedShape] = useState(null);

  useEffect(() => {
    // const simplifiedShape = simplify(shape, 0.009);
    const processed = processShapeData(shape);
    // console.log('processed', simplifiedShape, shape);
    setProcessedShape(processed);
  }, [shape]);

  return processedShape;
};

const useMapPreviewData = (shape, processedShape) => {
  const [mapPreviewData, setMapPreviewData] = useState(null);

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
    console.log('imageShape', imageShape);
    
    const urlEncodedImageShapeGeoJSON = encodeURIComponent(
      JSON.stringify(imageShape),
    );

    console.log('urlEncodedImageShapeGeoJSON', imageShape);

    let bounds = getShapeSourceBounds(shape);
    bounds = bounds[0].concat(bounds[1]);
    console.log('bounds', bounds);

    const {
      coordinates: [lng, lat],
    } = shape.features[0].geometry;

    const mapPreviewEndpoint = `${api}/mapPreview`;
    console.log('mapPreviewEndpoint', mapPreviewEndpoint);

    const data = {
      isPoint: isPoint(shape),
      uri: isPoint(shape)
        ? `${mapPreviewEndpoint}/pin-s+db4848(${lng},${lat})/${lng},${lat},8.63,0/900x400`
        : `${mapPreviewEndpoint}/geojson(${urlEncodedImageShapeGeoJSON})/[${bounds.join(',')}]/900x400?padding=50,30,30,30`,
    };

    setMapPreviewData(data);
  }, [shape, processedShape]);

  return mapPreviewData;
};

export { useProcessedShape, useMapPreviewData };
