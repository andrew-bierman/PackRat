import { TripActivity } from '@packrat/validations';

export function calculateTripScore(trip: {
  startDate: string;
  endDate: string;
  activity: string | null;
}): { totalScore: number } {
  const { startDate, endDate, activity } = trip;
  const start = new Date(startDate);
  const end = new Date(endDate);

  const tripDuration =
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  // Define scoring weights for each activity
  const activityScores: Record<TripActivity, number> = {
    [TripActivity.TRIP]: 5,
    [TripActivity.RUNNING]: 8,
    [TripActivity.BIKING]: 9,
    [TripActivity.CAMPING]: 7,
    [TripActivity.FISHING]: 6,
    [TripActivity.TREKKING]: 9,
    [TripActivity.ROCK_CLIMBING]: 10,
    [TripActivity.HIKING]: 8,
    [TripActivity.SWIMMING]: 7,
  };

  const activityScore = activity ? activityScores[activity] || 5 : 5;

  const tripScore = tripDuration * activityScore;

  return { totalScore: Math.round(tripScore) };
}
