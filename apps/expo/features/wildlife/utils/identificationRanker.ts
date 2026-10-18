import type { IdentificationResult, SpeciesEntry } from '../types';
import { CONFIDENCE_POLICY, clearsFloor } from './confidencePolicy';

/** A raw classifier output: a species id and the model's confidence in it. */
export interface SpeciesPrediction {
  speciesId: string;
  confidence: number;
}

/**
 * The outcome of a ranking pass. The two "no answer" cases are distinct
 * because they call for different things from the user.
 */
export type RankOutcome =
  | { kind: 'ranked'; results: IdentificationResult[] }
  | { kind: 'noConfidentMatch' }
  | { kind: 'outsideLoadedPacks' };

/**
 * Enough to push an out-of-region species below an in-region rival of similar
 * confidence, not enough to bury a strong match.
 */
const OUT_OF_REGION_PENALTY = 0.4;

/** The server replaces the device's answer only when it is this much more confident. */
const SERVER_SUPERSEDE_MARGIN = 0.15;

function score(
  candidate: { species: SpeciesEntry; confidence: number },
  region: string | null,
): number {
  const { species, confidence } = candidate;
  if (!region || species.regions.length === 0 || species.regions.includes(region)) {
    return confidence;
  }
  return confidence * OUT_OF_REGION_PENALTY;
}

/**
 * Turns raw predictions into the ranked list the user sees.
 *
 * Species that do not occur in `region` are demoted rather than removed:
 * animals stray and users travel, so a regional mismatch is evidence, not a
 * verdict. The reported confidence stays the model's; the region only decides
 * order.
 */
export function rankPredictions(opts: {
  predictions: SpeciesPrediction[];
  speciesById: ReadonlyMap<string, SpeciesEntry>;
  source: IdentificationResult['source'];
  region: string | null;
  regionIsCovered: boolean;
}): RankOutcome {
  const { predictions, speciesById, source, region, regionIsCovered } = opts;

  const kept = predictions.flatMap(({ speciesId, confidence }) => {
    const species = speciesById.get(speciesId);
    return species && clearsFloor(confidence, species.dangerLevel) ? [{ species, confidence }] : [];
  });

  if (kept.length === 0) {
    return { kind: regionIsCovered ? 'noConfidentMatch' : 'outsideLoadedPacks' };
  }

  const results = kept
    .map((candidate) => ({
      ...candidate,
      score: score(candidate, region),
    }))
    // Ties broken by name so identical photos never reshuffle.
    .sort((a, b) =>
      a.score === b.score
        ? a.species.commonName.localeCompare(b.species.commonName)
        : b.score - a.score,
    )
    .slice(0, CONFIDENCE_POLICY.maximumResults)
    .map(({ species, confidence }) => ({ species, confidence, source }));

  return { kind: 'ranked', results };
}

/**
 * Merges a server answer into a local one. The on-device answer stands unless
 * the server is meaningfully more confident; a marginal improvement is not
 * worth showing a different name for the same photo.
 */
export function mergeServerResults(
  local: IdentificationResult[],
  server: IdentificationResult[],
): IdentificationResult[] {
  const bestServer = server[0];
  const bestLocal = local[0];
  if (!bestServer) return local;
  if (!bestLocal) return server;
  return bestServer.confidence >= bestLocal.confidence + SERVER_SUPERSEDE_MARGIN ? server : local;
}
