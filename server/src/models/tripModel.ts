import mongoose, { Schema } from 'mongoose';
import myDB from './dbConnection';
import autopopulate from 'mongoose-autopopulate';
import GeoJSON from './geojsonModel';

const TripSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    weather: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    destination: { type: String, required: true },
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
    packs: { type: Schema.Types.ObjectId, ref: 'Pack' },
    is_public: { type: Boolean },
    type: { type: String, default: 'trip' },
  },
  { timestamps: true },
);

TripSchema.plugin(autopopulate);

TripSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.geojson = {
      type: 'FeatureCollection',
      features: returnedObject.geojson,
    };
  },
});

TripSchema.index({ geojson: '2dsphere' });

const Trip = myDB.model('Trip', TripSchema);
export default Trip;
