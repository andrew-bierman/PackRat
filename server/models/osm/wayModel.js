import mongoose from "mongoose";
import {
  fromOSM,
  fromGeoJSON,
  toGeoJSON,
  isGeoJSONFormat,
  isOSMFormat,
} from "../../utils/osmFunctions.js";
import myDB from "../dbConnection.js";

const { Schema } = mongoose;

const WaySchema = new Schema({
  osm_id: Number,
  osm_type: String,
  tags: Object,
  nodes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Node",
    },
  ],
  geoJSON: Object,
  updated_at: Date,
});

WaySchema.pre("save", async function (next) {
  try {

    if(this.type !== 'way') {
      throw new Error('This is not a way')
    }

    next();
  } catch (err) {
    next(err);
  }
});

WaySchema.pre("save", async function (next) {
  try {
    // this.geoJSON = toGeoJSON(this.constructor, this); // use the exported toGeoJSON

    this.geoJSON = await this.toGeoJSON(); // use the instance method toGeoJSON

    next();
  } catch (err) {
    next(err);
  }
});

WaySchema.method("toGeoJSON", function () {
  console.log("toGeoJSON instance in mongo schema", this)
  return toGeoJSON(this);
});

const Way = mongoose.model("Way", WaySchema);

export default Way;
