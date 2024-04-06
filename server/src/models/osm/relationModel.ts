import mongoose from 'mongoose';
import myDB from '../dbConnection';
import { toGeoJSON } from '../../utils/osmFunctions/modelHandlers';

const { Schema } = mongoose;

const RelationSchema = new Schema(
  {
    osm_id: Number,
    osm_type: { type: String, default: 'relation' },
    tags: Object,
    members: [
      {
        type: { type: String, enum: ['node', 'way', 'relation'] },
        refId: { type: Schema.Types.ObjectId }, // This will store ObjectId of related Node, Way, or Relation
        role: String,
      },
    ],
    geoJSON: Object,
    updated_at: Date,
  },
  { timestamps: true },
);

RelationSchema.pre('save', async function (next) {
  if (this.osm_type !== 'relation') {
    throw new Error('This is not a relation');
  }
  next();
});

RelationSchema.method('toGeoJSON', async function () {
  console.log('toGeoJSON instance in mongo schema', this);
  return await toGeoJSON(this.constructor, this);
});

RelationSchema.method('toJSON', async function () {
  const { _id, ...object } = this.toObject();
  // object.id = _id.toString();
  // Asynchronously populate the members (you may need to add your own logic to populate based on type)
  for (const member of object.members) {
    if (member.type) {
      const refId = await mongoose.model(member.type).findById(member.refId);
      if (refId) {
        member.refId = refId;
      }
    }
  }
  return object;
});

const Relation = myDB.model('Relation', RelationSchema);

export default Relation;
