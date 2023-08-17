import { Schema, model } from "mongoose";
import { ItemCategory } from "../utils/itemCategory.ts";
import myDB from "./dbConnection.ts";
const itemCategorySchema = new Schema(
  {
    name: {
      type: String, // it can be either a Way or a Node
      enum: ItemCategory,
    },
  },
  {
    timestamps: true,
  }
);

export const ItemCategoryModel = myDB.model("ItemCategory", itemCategorySchema);
