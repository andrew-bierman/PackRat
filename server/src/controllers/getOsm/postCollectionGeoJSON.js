import {
  findOrCreateOne,
  ensureIdProperty,
  ensureModelProperty,
} from "../../utils/osmFunctions/modelHandlers.ts";
import { isGeoJSONFormat } from "../../utils/osmFunctions/dataFormatters.ts";

/**
 * Handles the POST request for collection GeoJSON.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} - returns a Promise that resolves to undefined
 */
export const postCollectionGeoJSON = async (req, res) => {
    console.log("in postGeoJSON");
    const geojson = req.body;
  
    if (!geojson || !isGeoJSONFormat(geojson)) {
      res.status(400).send({ message: "Invalid or missing geoJSON" });
      return; // Return early to avoid further execution
    }
  
    try {
      // Check if the GeoJSON is a FeatureCollection
      if (geojson.type === "FeatureCollection") {
        const data = geojson.features;
        console.log("data", data);
        const processedElements = data.map((element) => ensureIdProperty(element));
        const Models = processedElements.map((element) =>
          ensureModelProperty(element)
        );
        console.log("processedElements", processedElements);
        const newInstances = await Promise.all(
          Models.map((Model, index) => findOrCreateOne(Model, processedElements[index]))
        );
        res.status(201).json({
          status: "success",
          data: {
            newInstances,
          },
        });
      } else {
        // Handle single feature
        const processedElement = ensureIdProperty(geojson);
        const Model = ensureModelProperty(processedElement);
        console.log("processedElement", processedElement);
        const newInstance = await findOrCreateOne(Model, processedElement);
        res.status(201).json({
          status: "success",
          data: {
            newInstance,
          },
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  };