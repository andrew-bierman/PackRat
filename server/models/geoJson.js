import mongoose, { Schema } from "mongoose";
import myDB from "./dbConnection.js";

// Create a new Mongoose schema for the uploaded GeoJSON data
const GeoJSONSchema = new Schema({
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  });
  
  // Create a new model based on the schema
 export const GeoJSON = myDB.model("GeoJSON", GeoJSONSchema);