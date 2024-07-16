import { Schema, model } from 'mongoose';
import { ItemCategory } from '../utils/itemCategory';
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

itemCategorySchema.index({ name: 1 });
itemCategorySchema.index({ location: '2dsphere' });

export const ItemCategoryModel = myDB.model('ItemCategory', itemCategorySchema);
