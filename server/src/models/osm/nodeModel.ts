import mongoose from 'mongoose';
import myDB from '../dbConnection';

const { Schema } = mongoose;

const NodeSchema = new Schema(
  {
    id: Number, // the OSM ID
    lat: Number, // latitude
    lon: Number, // longitude
    tags: { type: Map, of: String }, // tags as a map
    updated_at: Date, // last update from OSM
  },
  { timestamps: true },
);

// Adding an index to the 'id' field
NodeSchema.index({ id: 1 }, { unique: true });

// add a to JSON method to the schema
NodeSchema.method('toJSON', async function () {
  const { _id, ...object } = this.toObject();
  // object.id = _id.toString();
  return object;
});

NodeSchema.statics.findOrCreateMany = async function (ids, nodes) {
  // Find existing nodes
  const existingNodes = await this.find({ id: { $in: ids } });
  const existingIds = existingNodes.map((node: any) => node.id);

  // Create new nodes
  const newNodes = nodes
    .filter((node: any) => !existingIds.includes(node.id))
    .map((node: any) => new this(node));

  // Save new nodes
  if (newNodes.length > 0) {
    await this.insertMany(newNodes);
  }

  // Return all nodes
  return this.find({ id: { $in: ids } });
};

const Node = myDB.model('Node', NodeSchema);

export default Node;
