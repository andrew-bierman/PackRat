import axios from 'axios';
import { MAPBOX_ACCESS_TOKEN } from '../../config';

/**
 * gets map preview image from mapbox
 * @param mapPreviewUri {lon},{lat},{zoom},{bearing},{pitch}|{bbox}|{auto}/{width}x{height}{@2x}[?params]
 * @see [the mapbox docs](https://docs.mapbox.com/api/maps/static-images/?size=n_10_n#retrieve-a-static-map-from-a-style)
 * @returns {ArrayBuffer} ArrayBuffer of the preview image
 */
export default async function getMapPreviewService(
  mapPreviewUri: string,
): Promise<ArrayBuffer> {
  const [map, queryParams] = mapPreviewUri.split('?');

  const { data } = await axios.get(
    `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${map}?access_token=${MAPBOX_ACCESS_TOKEN}&${queryParams}`,
    { responseType: 'arraybuffer' },
  );

  return data;
}
