import mongoose from "mongoose";
import User from "./userModel.js";
import Pack from "./packModel.js";
import Way from "./osm/wayModel.js";
import Node from "./osm/nodeModel.js";
import myDB from "./dbConnection.js";
import autopopulate from "mongoose-autopopulate";

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
    osm_ref: {
      type: Schema.Types.ObjectId, // the id of the Way or Node
      refPath: "osm_type", // the name of the model to use for populating
      // autopopulate: true
    },
    osm_type: {
      type: String,
      enum: ["Way", "Node", "Relation"], // it can be either a Way, Node or a Relation
    },
    owner_id: { type: Schema.Types.ObjectId, ref: "User" },
    packs: { type: Schema.Types.ObjectId, ref: "Pack" },
    is_public: { type: Boolean },
    type: { type: String, default: "trip" },
  },
  { timestamps: true }
);

// Create an index on the "owner_id" field
TripSchema.index({ owner_id: 1 });

// Create an index on the "destination" field
TripSchema.index({ destination: 1 });

// Create an index on the "start_date" field
TripSchema.index({ start_date: 1 });

// Create an index on the "end_date" field
TripSchema.index({ end_date: 1 });

TripSchema.plugin(autopopulate)

const Trip = myDB.model("Trip", TripSchema);
export default Trip;
