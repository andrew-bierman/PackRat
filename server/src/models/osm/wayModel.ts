import mongoose from 'mongoose';
// import { toGeoJSON } from '../../utils/osmFunctions/modelHandlers';
import myDB from '../dbConnection';
import autopopulate from 'mongoose-autopopulate';

const { Schema } = mongoose;

const WaySchema = new Schema(
  {
    osm_id: Number,
    osm_type: String,
    tags: Object,
    nodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Node',
        // autopopulate: true,
      },
    ],
    geoJSON: Object,
    updated_at: Date,
  },
  { timestamps: true },
);

// WaySchema.plugin(autopopulate);

WaySchema.pre('save', async function (next) {
  try {
    if (this.osm_type !== 'way') {
      console.log(
        'ERROR in WaySchema.pre("save"): this.osm_type !== "way"',
        this.osm_type,
      );
      throw new Error('This is not a way');
    }
    next();
  } catch (err: any) {
    next(err);
  }
});

WaySchema.pre('save', async function (next) {
  try {
    // this.geoJSON = toGeoJSON(this.constructor, this); // use the exported toGeoJSON
    // const geoJSON = await (this as any).toGeoJSON(); // use the instance method toGeoJSON
    next();
  } catch (err: any) {
    next(err);
  }
});

// WaySchema.method('toGeoJSON', async function () {
//   // console.log("toGeoJSON instance in mongo schema", this);
//   return await toGeoJSON(this.constructor, this);
// });

// add a to JSON method to the schema that populates the nodes
WaySchema.method('toJSON', async function () {
  console.log('toJSON instance in mongo schema', this);
  const { _id, ...object } = this.toObject();
  // object.id = _id.toString();
  // object.nodes = await this.populate("nodes").execPopulate(); TODO
  return object;
});

const Way = myDB.model('Way', WaySchema);

export default Way;
