import { postCollectionGeoJSONService } from "../../services/osm/osm.service.ts";

/**
 * Handles the POST request for collection GeoJSON.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} - returns a Promise that resolves to undefined
 */
export const postCollectionGeoJSON = async (req, res) => {
  try {
    console.log("in postGeoJSON");
    const geojson = req.body;

    const result = await postCollectionGeoJSONService(geojson);

    res.status(201).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};