import {
  ensureIdProperty,
  processElement,
} from '../../utils/osmFunctions/modelHandlers';
import { isGeoJSONFormat } from '../../utils/osmFunctions/dataFormatters';

/**
 * This function posts a single GeoJSON object to the service.
 * @param {any} prisma - Prisma client.
 * @param {any} geojson - The GeoJSON object to be posted.
 * @throws {Error} If the geoJSON is invalid or missing.
 * @return {Promise<any>} A Promise that resolves to the newly created instance.
 */
export const postSingleGeoJSONService = async (geojson) => {
  if (!geojson || !isGeoJSONFormat(geojson)) {
    throw new Error('Invalid or missing geoJSON');
  }

  const processedElement = ensureIdProperty(geojson);
  const newInstance = await processElement(processedElement);
  return newInstance;
};
