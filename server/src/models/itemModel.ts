import mongoose from 'mongoose';
import myDB from './dbConnection';

const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ItemCategory',
    },
    owners: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    packs: [{ type: Schema.Types.ObjectId, ref: 'Pack', default: [] }],
    global: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

ItemSchema.index({ location: '2dsphere' });

const Item = myDB.model('Item', ItemSchema);
export default Item;
