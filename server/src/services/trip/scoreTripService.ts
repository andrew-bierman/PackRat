import mongoose from 'mongoose';
import Trip from '../../models/tripModel';
import { calculateTripScore } from '../../utils/scoreTrip';


export async function scoreTripService(tripId: string) {
  try {
      const objectId = new mongoose.Types.ObjectId(tripId);
      const tripData = await Trip.findById(objectId)

      const tripScore = calculateTripScore(tripData)

    //   const { scores, grades } = tripScore;

    //   const updatedPack = await Pack.findByIdAndUpdate(
    //     { _id: packId },
    //     { scores, grades },
    //     { returnOriginal: false },
    //   );
  
    //   return updatedPack;


  } catch (error) {
    throw new Error('Unable to score trip: ' + error.message);
  }
}


