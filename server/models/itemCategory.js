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

export const ItemCategoryModel = myDB.model("ItemCategory", itemCategorySchema);
