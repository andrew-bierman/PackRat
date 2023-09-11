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
    grades: {
      type: Object,
      default: {
        weather: '',
        essentialItems: '',
        redundancyAndVersatility: '',
      },
    },
    scores: {
      type: Object,
      default: {
        weatherScore: 0,
        essentialItemsScore: 0,
        redundancyAndVersatilityScore: 0,
      },
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

TripSchema.virtual('totalScore').get(function () {
  const scoresArray: number[] = Object.values(this.scores);
  const sum: number = scoresArray.reduce(
    (total: number, score: number) => total + score,
    0,
  );
  const average: number = scoresArray.length > 0 ? sum / scoresArray.length : 0;

  return Math.round(average * 100) / 100;
});

const Trip = myDB.model('Trip', TripSchema);
export default Trip;
