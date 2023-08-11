import { Schema, model } from "mongoose";
// import { ItemCategory } from "../utils/itemCategory.js";
import myDB from "./dbConnection.js";

const itinerarySchema = new Schema({
    days: [
      {
        title: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          default: "", // You can change the default value as needed
        },
      },
    ],
  });

export const itinerary = myDB.model("comments",itinerarySchema);