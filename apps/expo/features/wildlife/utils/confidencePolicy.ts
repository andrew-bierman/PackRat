import type { SpeciesEntry } from '../types';

/**
 * The thresholds that decide whether a prediction is allowed to read as an
 * answer. Centralised because the rule is a safety rule, not a display detail:
 * a low-confidence match on a dangerous species is a caution, not an
 * identification. Values match the iOS app's `ConfidencePolicy`.
 */
export const CONFIDENCE_POLICY = Object.freeze({
  /** Below this, nothing is shown as a match at all. */
  floor: 0.15,
  /** At or above this, the top result may read as a confident answer. */
  confident: 0.65,
  /** A ranked list is more truthful than one verdict; a long tail is noise. */
  maximumResults: 5,
  /** Dangerous species are kept at a lower bar so a plausible venomous match is never dropped. */
  dangerousFloor: 0.05,
} as const);

export function clearsFloor({
  confidence,
  dangerLevel,
}: {
  confidence: number;
  dangerLevel: SpeciesEntry['dangerLevel'];
}): boolean {
  const floor =
    dangerLevel === 'dangerous' ? CONFIDENCE_POLICY.dangerousFloor : CONFIDENCE_POLICY.floor;
  return confidence >= floor;
}

export function isConfident(confidence: number): boolean {
  return confidence >= CONFIDENCE_POLICY.confident;
}

/** Never rounded up in the user's favour. */
export function displayPercentage(confidence: number): number {
  return Math.floor(confidence * 100);
}
