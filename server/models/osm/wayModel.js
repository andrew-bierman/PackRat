import mongoose from "mongoose";
import { toGeoJSON } from "../../utils/osmFunctions/modelHandlers.js";
import myDB from "../dbConnection.js";

const { Schema } = mongoose;

const WaySchema = new Schema(
  {
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
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

WaySchema.pre("save", async function (next) {
  try {
    if (this.osm_type !== "way") {
      console.error(
        'ERROR in WaySchema.pre("save"): this.osm_type !== "way"',
        this.osm_type
      );
      throw new Error("This is not a way");
    }
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

WaySchema.pre("save", async function (next) {
  try {
    this.geoJSON = await this.toGeoJSON();
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

WaySchema.method("toGeoJSON", async function () {
  return await toGeoJSON(Way, this);
});

const Way = myDB.model("Way", WaySchema);

export default Way;
