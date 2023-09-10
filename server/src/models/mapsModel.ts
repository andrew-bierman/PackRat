import mongoose from 'mongoose';
import myDB from './dbConnection';
import autopopulate from 'mongoose-autopopulate';
import GeoJSON from './geojsonModel';

const { Schema } = mongoose;

const MapsSchema = new Schema(
  {
    name: { type: String, required: true },
    geojson: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: GeoJSON,
          autopopulate: true,
        },
      ],
      required: true,
    },
    owner_id: { type: Schema.Types.ObjectId, ref: 'User' },
    is_public: { type: Boolean, default: false },
  },
  { timestamps: true },
);

MapsSchema.plugin(autopopulate);

MapsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.geojson = {
      type: 'FeatureCollection',
      features: returnedObject.geojson,
    };
  },
});

const Map = myDB.model('Map', MapsSchema);
export default Map;
