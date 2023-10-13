import { responseHandler } from '../../helpers/responseHandler';
import { postCollectionGeoJSONService } from '../../services/osm/osm.service';

/**
 * Handles the POST request for collection GeoJSON.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} - returns a Promise that resolves to undefined
 */
export const postCollectionGeoJSON = async (c) => {
  console.log('in postGeoJSON');
  const geojson = c.req.json();

  const result = await postCollectionGeoJSONService(geojson);

  res.locals.data = result;
  responseHandler(c);
};
