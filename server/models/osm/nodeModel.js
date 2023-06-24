import mongoose from "mongoose";
import myDB from "../dbConnection.js";

const { Schema } = mongoose;

const NodeSchema = Schema(
  {
    id: Number, // the OSM ID
    lat: Number, // latitude
    lon: Number, // longitude
    tags: { type: Map, of: String }, // tags as a map
    updated_at: Date, // last update from OSM
  },
  { timestamps: true }
);

// add a to JSON method to the schema
NodeSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = object.id.toString();
  return object;
});

NodeSchema.statics.findOrCreateMany = async function (ids, nodes) {
  // Find existing nodes
  const existingNodes = await this.find({ id: { $in: ids } });
  const existingIds = existingNodes.map((node) => node.id);

  // Create new nodes
  const newNodes = nodes
    .filter((node) => !existingIds.includes(node.id))
    .map((node) => new this(node));

  // Save new nodes
  if (newNodes.length > 0) {
    await this.insertMany(newNodes);
  }

  // Return all nodes
  return this.find({ id: { $in: ids } });
};

const Node = myDB.model("Node", NodeSchema);

export default Node;
