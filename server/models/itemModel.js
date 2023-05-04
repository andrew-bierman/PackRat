import mongoose from "mongoose";
import Pack from "./packModel.js";

const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  // packId: { type: Schema.Types.ObjectId, ref: "Pack" },
  owners: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  packs: [{ type: Schema.Types.ObjectId, ref: "Pack", default: [] }],
  createdAt: String,
});

const myDB = mongoose.connection.useDb("packratdb");

export default myDB.model("Item", ItemSchema);
