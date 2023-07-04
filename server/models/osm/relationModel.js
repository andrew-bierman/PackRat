import mongoose from "mongoose";
import myDB from "../dbConnection.js";
import { toGeoJSON } from "../../utils/osmFunctions/modelHandlers.js";

const { Schema } = mongoose;

const RelationSchema = new Schema(
  {
    osm_id: Number,
    osm_type: { type: String, default: "relation" },
    tags: Object,
    members: [
      {
        type: { type: String, enum: ["node", "way", "relation"] },
        refId: { type: Schema.Types.ObjectId },
        role: String,
      },
    ],
    geoJSON: Object,
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

RelationSchema.pre("save", async function (next) {
  try {
    if (this.osm_type !== "relation") {
      console.error("This is not a relation");
      throw new Error("This is not a relation");
    }
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

RelationSchema.method("toGeoJSON", async function () {
  return await toGeoJSON(Relation, this);
});

RelationSchema.method("toJSON", async function () {
  const { _id, ...object } = this.toObject();
  object.id = _id.toString();

  try {
    const memberPromises = object.members.map(async (member) => {
      member.refId = await mongoose.model(member.type).findById(member.refId);
    });

    await Promise.all(memberPromises);
  } catch (err) {
    console.error(err);
  }

  return object;
});

const Relation = myDB.model("Relation", RelationSchema);

export default Relation;
