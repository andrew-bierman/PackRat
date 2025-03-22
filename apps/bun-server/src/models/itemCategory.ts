import { Schema, model } from 'mongoose';
import { ItemCategory } from '../utils/constants';
import myDB from './dbConnection';
const itemCategorySchema = new Schema(
  {
    name: {
      type: String, // it can be either a Way or a Node
      enum: ItemCategory,
    },
  },
  {
    timestamps: true,
  },
);

export const ItemCategoryModel = myDB.model('ItemCategory', itemCategorySchema);
