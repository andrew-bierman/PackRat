import mongoose from 'mongoose';
import Trip from '../../models/tripModel';
import { calculateTripScore } from '../../utils/score/scoreTrip';
import Pack from '../../models/packModel';

export async function scoreTripService(tripId: string) {
  try {
    const objectId = new mongoose.Types.ObjectId(tripId);
    const tripData = await Trip.findById(objectId);

    const packData = await Pack.findById(tripData.packs.toString());

    const { weatherScore, essentialItemsScore, redundancyAndVersatilityScore } =
      calculateTripScore(tripData, packData.items);

    const updatedTrip = await Trip.findByIdAndUpdate(
      { _id: tripId },
      {
        scores: {
          weatherScore,
          essentialItemsScore,
          redundancyAndVersatilityScore,
        },
        grades: {
          weather: weatherScore,
          essentialItems: essentialItemsScore,
          redundancyAndVersatility: redundancyAndVersatilityScore,
        },
      },
      { returnOriginal: false },
    );

    return updatedTrip;
  } catch (error) {
    throw new Error('Unable to score trip: ' + error.message);
  }
}
