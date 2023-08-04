import { Schema, model } from "mongoose";
import { ItemCategory } from "../utils/itemCategory.js";
import myDB from "./dbConnection.js";
const itemCategorySchema = new Schema(
  {
    name: {
      type: String, // it can be either a Way or a Node
      enum: ItemCategory,
    },
  },
  {
    timestamp: true,
  }
);

// Add an index on the "osm_id" field
itemCategorySchema.index({ name: 1 });


export const ItemCategoryModel = myDB.model("ItemCategory", itemCategorySchema);
