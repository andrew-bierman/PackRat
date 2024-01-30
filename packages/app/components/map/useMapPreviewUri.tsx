import { useMemo } from 'react';
import { api } from '../../constants/api';

export const useMapPreviewUri = ({
  imageShape,
  bounds,
  coordinates,
  isPoint,
}) => {
  return useMemo(() => {
    const urlEncodedImageShapeGeoJSON = encodeURIComponent(
      JSON.stringify(imageShape, null, 0),
    );
    const [lng, lat] = coordinates;
    const mapPreviewEndpoint = `${api}/mapPreview`;

    return isPoint
      ? `${mapPreviewEndpoint}/pin-s+db4848(${lng},${lat})/${lng},${lat},8.63,0/900x400`
      : `${mapPreviewEndpoint}/geojson(${urlEncodedImageShapeGeoJSON})/[${bounds.join(
          ',',
        )}]/900x400?padding=50,30,30,30`;
  }, [imageShape, bounds, coordinates, isPoint]);
};
