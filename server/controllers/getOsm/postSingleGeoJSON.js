import {
  findOrCreateOne,
  ensureIdProperty,
  ensureModelProperty,
} from "../../utils/osmFunctions/modelHandlers.js";
import { isGeoJSONFormat } from "../../utils/osmFunctions/dataFormatters.js";

/**
 * Handles the POST request for a single GeoJSON.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {void} - does not return a value
 */
export const postSingleGeoJSON = async (req, res) => {
    // console.log("req.body", req.body)
    console.log("in postSingleGeoJSON");
    const geojson = req.body;
  
    if (!geojson || !isGeoJSONFormat(geojson)) {
      res.status(400).send({ message: "Invalid or missing geoJSON" });
      return; // Return early to avoid further execution
    }
  
    try {
      const data = geojson;
      console.log("data", data);
      const processedElement = ensureIdProperty(data);
      const Model = ensureModelProperty(processedElement);
      console.log("processedElement", processedElement);
      const newInstance = await findOrCreateOne(Model, processedElement);
      res.status(201).json({
        status: "success",
        data: {
          newInstance,
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