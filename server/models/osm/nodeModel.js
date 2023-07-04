import mongoose from "mongoose";
import myDB from "../dbConnection.js";

const { Schema } = mongoose;

const NodeSchema = Schema(
  {
    id: Number,
    lat: Number,
    lon: Number,
    tags: { type: Map, of: String },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

NodeSchema.statics.findOrCreateMany = async function (ids, nodes) {
  const existingNodes = await this.find({ id: { $in: ids } });
  const existingIds = existingNodes.map((node) => node.id);

  const newNodes = nodes
    .filter((node) => !existingIds.includes(node.id))
    .map((node) => new this(node));

  if (newNodes.length > 0) {
    await this.insertMany(newNodes);
  }

  return this.find({ id: { $in: ids } });
};

const Node = myDB.model("Node", NodeSchema);

export default Node;
