import { responseHandler } from '../../helpers/responseHandler';
import { postCollectionGeoJSONService } from '../../services/osm/osm.service';

/**
 * Handles the POST request for collection GeoJSON.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} - returns a Promise that resolves to undefined
 */
// export const postCollectionGeoJSON = async (req, res) => {
//   console.log('in postGeoJSON');
//   const geojson = req.body;

//   const result = await postCollectionGeoJSONService(geojson);

//   res.locals.data = result;
//   responseHandler(res);
// };
