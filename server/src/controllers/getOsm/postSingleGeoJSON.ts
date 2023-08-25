import { postSingleGeoJSONService } from '../../services/osm/osm.service';

/**
 * Handles the POST request for a single GeoJSON.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {void} - does not return a value
 */
export const postSingleGeoJSON = async (req, res) => {
  try {
    console.log('in postSingleGeoJSON');
    const geojson = req.body;

    const result = await postSingleGeoJSONService(geojson);

    res.status(201).json({
      status: 'success',
      data: {
        result,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
