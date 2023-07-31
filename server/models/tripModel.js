import mongoose from "mongoose";
import User from "./userModel.js";
import Pack from "./packModel.js";

const { Schema } = mongoose;

const TripSchema = new Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  weather: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  destination: { type: String, required: true },
  owner_id: { type: Schema.Types.ObjectId, ref: "User" },
  packs: { type: Schema.Types.ObjectId, ref: Pack },
  is_public: { type: Boolean },
});

const myDB = mongoose.connection.useDb("packratdb");

export default myDB.model("Trip", TripSchema);
