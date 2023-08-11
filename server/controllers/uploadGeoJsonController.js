import { GeoJSON } from "../models/geoJson.js";


export const uploadGeoJSON = async (req, res) => {
    try {
      // Get the GeoJSON data from the request body
      const { geojson } = req.body;
  
      // Create a new document in the UploadedGeoJSON collection to store the GeoJSON data
      await GeoJSON.create({ data: geojson });
  
      res.status(200).json({ message: "GeoJSON uploaded successfully" });
    } catch (error) {
      console.error("Error uploading GeoJSON:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

// export {uploadGeoJSON};