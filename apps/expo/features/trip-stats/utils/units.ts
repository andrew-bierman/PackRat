/**
 * Distance and elevation in the user's units. There is no separate distance preference: a user
 * who reads wind in mph reads trails in miles and feet, and km/h means kilometres and metres.
 */
export type TripDistanceUnit = 'metric' | 'imperial';

export function distanceUnitFromSpeedUnit(speedUnit: 'mph' | 'kmh'): TripDistanceUnit {
  return speedUnit === 'mph' ? 'imperial' : 'metric';
}

const METRES_PER_MILE = 1_609.344;
const METRES_PER_FOOT = 0.3048;

export function distanceSymbol(unit: TripDistanceUnit): string {
  return unit === 'imperial' ? 'mi' : 'km';
}

export function elevationSymbol(unit: TripDistanceUnit): string {
  return unit === 'imperial' ? 'ft' : 'm';
}

export function distanceValue(metres: number, unit: TripDistanceUnit): number {
  return metres / (unit === 'imperial' ? METRES_PER_MILE : 1_000);
}

export function metresFromDistance(value: number, unit: TripDistanceUnit): number {
  return value * (unit === 'imperial' ? METRES_PER_MILE : 1_000);
}

export function elevationValue(metres: number, unit: TripDistanceUnit): number {
  return metres / (unit === 'imperial' ? METRES_PER_FOOT : 1);
}

export function metresFromElevation(value: number, unit: TripDistanceUnit): number {
  return value * (unit === 'imperial' ? METRES_PER_FOOT : 1);
}

function formatNumber(value: number, fractionDigits: number): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

/** "12.4 mi", or "1,240 km" once the decimal stops adding anything. */
export function formatDistance(metres: number, unit: TripDistanceUnit): string {
  const value = distanceValue(metres, unit);
  return `${formatNumber(value, value >= 100 ? 0 : 1)} ${distanceSymbol(unit)}`;
}

export function formatElevation(metres: number, unit: TripDistanceUnit): string {
  return `${formatNumber(elevationValue(metres, unit), 0)} ${elevationSymbol(unit)}`;
}

/** Short gaps, like how far a peak sits from a route: "0.4 mi" or "650 m". */
export function formatShortDistance(metres: number, unit: TripDistanceUnit): string {
  if (unit === 'metric' && metres < 1_000) return `${Math.round(metres / 10) * 10} m`;
  const value = distanceValue(metres, unit);
  return `${formatNumber(value, value < 10 ? 1 : 0)} ${distanceSymbol(unit)}`;
}
