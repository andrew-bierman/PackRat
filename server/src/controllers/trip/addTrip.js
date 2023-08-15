import Trip from "../../models/tripModel.ts";
import Node from "../../models/osm/nodeModel.ts";
import Way from "../../models/osm/wayModel.ts";
import Relation from "../../models/osm/relationModel.ts";

/**
 * Adds a trip to the database.
 * @param {Object} req - The request object containing the trip details.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves to a success message or rejects with an error message.
 */
export const addTrip = async (req, res) => {
    try {
      const {
        name,
        description,
        duration,
        weather,
        start_date,
        end_date,
        destination,
        geoJSON,
        owner_id,
        packs,
        is_public,
      } = req.body;
  
      // Create the OSM object and get its _id
      const { osm_ref, osm_type } = await createOSMObject(geoJSON);
  
      await Trip.create({
        name,
        description,
        duration,
        weather,
        start_date,
        end_date,
        destination,
        osm_ref,
        osm_type,
        owner_id,
        packs,
        is_public,
      });
  
      res.status(200).json({ msg: "success" });
    } catch (error) {
      console.error(error);
      res.status(404).json({ msg: "Unable to add trip" });
    }
  };

  // Helper function to create an OSM object (Node or Way) and return its _id
const createOSMObject = async (geoJSON) => {
    // Check if geoJSON object is valid
    if (!geoJSON || !geoJSON.properties) {
      throw new Error("Invalid or missing geoJSON");
    }
  
    // Access the OSM type directly from geoJSON properties
    const osmType = geoJSON.properties.osm_type;
  
    let OSMModel;
    if (osmType === "N") {
      OSMModel = Node;
    } else if (osmType === "W") {
      OSMModel = Way;
    } else if (osmType === "R") {
      OSMModel = Relation;
    } else {
      throw new Error("Invalid OSM type");
    }
  
    // Create the corresponding OSM object
    const osmData = new OSMModel({
      osm_id: geoJSON.properties.osm_id,
      osm_type:
        OSMModel === Node ? "node" : OSMModel === Way ? "way" : "relation", // Here change "W" to "way"
      tags: geoJSON.properties,
      geoJSON,
    });
  
    // Save the OSM object and return its _id
    await osmData.save();
  
    console.log("osmData", osmData);
  
    return {
      osm_ref: osmData._id,
      osm_type:
        OSMModel === Node ? "Node" : OSMModel === Way ? "Way" : "Relation",
    };
  };