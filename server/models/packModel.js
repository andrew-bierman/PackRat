import mongoose from "mongoose";
import Item from "./itemModel.js";
import myDB from "./dbConnection.js";

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
  if (this.items && this.items.length > 0 && this.items[0] instanceof Item) {
    return this.items.reduce((total, item) => total + item.weight * item.quantity, 0);
  } else {
    return 0;
  }
});

const Pack = myDB.model("Pack", PackSchema);
export default Pack;