import { checkEssentialItems } from './checkEssentialItems';
import { checkItemRedundancy } from './checkItemRedundancy';

type Trip = {
  weather: {
    main: {
      temp: number;
    };
  };
  scores: {
    weatherScore: number;
    essentialItemsScore: number;
    redundancyAndVersatilityScore: number;
  };
  pack: any; // You can further define the type for "pack"
};

type ScoreResult = {
  weatherScore: number;
  essentialItemsScore: number;
  redundancyAndVersatilityScore: number;
  totalScore: number;
};

function scoreWeather(trip: Trip): number {
  let score = 0;
  const temp = trip.weather.main.temp;

  if (temp >= 60 && temp <= 80) {
    score = 10;
  } else if ((temp >= 50 && temp < 60) || (temp > 80 && temp <= 90)) {
    score = 7;
  } else {
    score = 3;
  }

  return score;
}

function scoreEssentialItems(trip: Trip): number {
  return checkEssentialItems(trip.pack.items);
}

function scoreRedundancyAndVersatility(trip: Trip): number {
  return checkItemRedundancy(trip.pack.items);
}

export function calculateTripScore(trip: any): ScoreResult {
  const weatherScore = scoreWeather(trip);
  const essentialItemsScore = scoreEssentialItems(trip);
  const redundancyAndVersatilityScore = scoreRedundancyAndVersatility(trip);

  // Calculate a combined total score
  const totalScore =
    (weatherScore + essentialItemsScore + redundancyAndVersatilityScore) / 3;

  return {
    weatherScore: weatherScore,
    essentialItemsScore: essentialItemsScore,
    redundancyAndVersatilityScore: redundancyAndVersatilityScore,
    totalScore: totalScore,
  };
}
