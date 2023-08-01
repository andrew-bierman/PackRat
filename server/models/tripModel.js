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
      type: Schema.Types.ObjectId,  // the id of the Way or Node
      refPath: 'osm_type',  // the name of the model to use for populating
      // autopopulate: true
    },
    osm_type: {
      type: String,
      enum: ['Way', 'Node', 'Relation'],  // it can be either a Way or a Node
    },
    owner_id: { type: Schema.Types.ObjectId, ref: "User" },
    packs: { type: Schema.Types.ObjectId, ref: 'Pack' },
    is_public: { type: Boolean },
    type:{type:String,default: 'trip'}
  },
  { timestamps: true }
);

TripSchema.plugin(autopopulate)

const Trip = myDB.model("Trip", TripSchema);
export default Trip;
