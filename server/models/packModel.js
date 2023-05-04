import mongoose from "mongoose";
import Item from "./itemModel.js";

const { Schema } = mongoose;

const PackSchema = new Schema({
  name: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  owner_id: { type: Schema.Types.ObjectId, ref: "User" },
  is_public: { type: Boolean },
  favorited_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
  favorites_count: { type: Number },
  createdAt: String,
  owners: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
});

PackSchema.virtual("total_weight").get(function () {
  return this.items.reduce((total, item) => total + item.weight * item.quantity, 0);
});

const myDB = mongoose.connection.useDb("packratdb");

export default myDB.model("Pack", PackSchema);
