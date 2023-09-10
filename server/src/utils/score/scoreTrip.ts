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
  let data: any = trip.weather;

  let temp;

  if (trip) {
    data = JSON.parse(data);
    temp = data?.main?.temp;
  } else {
    temp = 0
  }

 

  if (temp >= 60 && temp <= 80) {
    score = 10;
  } else if ((temp >= 50 && temp < 60) || (temp > 80 && temp <= 90)) {
    score = 7;
  } else {
    score = 3;
  }

  return score;
}

function scoreEssentialItems(items: any[]): number {
  return checkEssentialItems(items);
}

function scoreRedundancyAndVersatility(items: any[]): number {
  return checkItemRedundancy(items);
}

export function calculateTripScore(trip: any, items: any): ScoreResult {
  const weatherScore = scoreWeather(trip);

  const essentialItemsScore = scoreEssentialItems(items);

  const redundancyAndVersatilityScore = scoreRedundancyAndVersatility(items);

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
