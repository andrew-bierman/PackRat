import mongoose from 'mongoose';
import Item from './itemModel';
import myDB from './dbConnection';
import { convertWeight } from '../utils/convertWeight';

const { Schema } = mongoose;

const PackSchema = new Schema(
  {
    name: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    owner_id: { type: Schema.Types.ObjectId, ref: 'User' },
    is_public: { type: Boolean },
    favorited_by: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: String,
    owners: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    grades: {
      type: Object,
      default: {
        weight: '',
        essentialItems: '',
        redundancyAndVersatility: '',
      },
    },
    scores: {
      type: Object,
      default: {
        weightScore: 0,
        essentialItemsScore: 0,
        redundancyAndVersatilityScore: 0,
      },
    },
    type: { type: String, default: 'pack' },
  },
  { timestamps: true },
);

PackSchema.virtual('favorites_count').get(function () {
  return this.favorited_by.length;
});

PackSchema.virtual('total_weight').get(function () {
  if (this.items && this.items.length > 0 && this.items[0] instanceof Item) {
    return this.items.reduce((total, item: any) => {
      // Convert each item's weight to grams
      const weightInGrams = convertWeight(item.weight, item.unit, 'g');
      return total + weightInGrams * item.quantity;
    }, 0);
  } else {
    return 0;
  }
});

PackSchema.virtual('totalScore').get(function () {
  const scoresArray: number[] = Object.values(this.scores);
  const sum: number = scoresArray.reduce(
    (total: number, score: number) => total + score,
    0,
  );
  const average: number = scoresArray.length > 0 ? sum / scoresArray.length : 0;

  return Math.round(average * 100) / 100;
});

PackSchema.set('toObject', { virtuals: true });
PackSchema.set('toJSON', { virtuals: true });

PackSchema.index({ coordinates: '2dsphere' });


const Pack = myDB.model('Pack', PackSchema);
export default Pack;
