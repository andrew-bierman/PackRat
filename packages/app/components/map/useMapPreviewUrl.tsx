// useMapPreviewUrl.ts
import { useState, useEffect } from 'react';
import { api } from '../../constants/api';

export const useMapPreviewUrl = (
  shape,
  processedShape,
  bounds,
  isPointShape,
) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const mapPreviewEndpoint = `${api}/mapPreview`;

    if (isPointShape) {
      const {
        coordinates: [lng, lat],
      } = shape.features[0].geometry;

      setUrl(
        `${mapPreviewEndpoint}/pin-s+db4848(${lng},${lat})/${lng},${lat},8.63,0/900x400`,
      );
    } else if (bounds && bounds.length) {
      const urlEncodedImageShapeGeoJSON = encodeURIComponent(
        JSON.stringify(processedShape, null, 0),
      );

      setUrl(
        `${mapPreviewEndpoint}/geojson(${urlEncodedImageShapeGeoJSON})/[${bounds.join(
          ',',
        )}]/900x400?padding=50,30,30,30`,
      );
    }
  }, [shape, processedShape, bounds, isPointShape]);

  return url;
};
