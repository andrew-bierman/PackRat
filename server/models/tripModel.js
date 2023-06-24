import mongoose from "mongoose";
import User from "./userModel.js";
import Pack from "./packModel.js";
import myDB from "./dbConnection.js";

const { Schema } = mongoose;

const TripSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    weather: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    destination: { type: String, required: true },
    trail_way: { type: Schema.ObjectId, ref: "Way" }, // reference to the Way table for this trip
    owner_id: { type: Schema.Types.ObjectId, ref: "User" },
    packs: { type: Schema.Types.ObjectId, ref: 'Pack' },
    is_public: { type: Boolean },
    type:{type:String,default: 'trip'}
  },
  { timestamps: true }
);

const Trip = myDB.model("Trip", TripSchema);
export default Trip;
