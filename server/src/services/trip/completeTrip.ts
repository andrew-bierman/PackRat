import { Trip } from '../../drizzle/methods/trip';

export const completeTripService = async (tripId: string) => {
  try {
    const tripClass = new Trip();
    tripClass.update({ id: tripId, is_completed: true });
  } catch (error) {
    console.error(error);
    throw new Error(`Unable to complete the trip ${tripId}`);
  }
};
