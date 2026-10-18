import type { SpeciesPrediction } from './identificationRanker';

/** Side of the square image the species model takes. */
export const MODEL_INPUT_SIZE = 224;

/**
 * The model's catch-all for subjects outside the species it knows. Never
 * surfaced as a species; its share of the probability is what pulls real
 * candidates below the floor when the subject is unfamiliar.
 */
export const OTHER_LABEL = '__other__';

/**
 * The largest centred square in an image — the crop the model was validated
 * with, and the one Vision's `.centerCrop` applies on iOS.
 */
export function centerCropRect(width: number, height: number) {
  const side = Math.min(width, height);
  return {
    originX: Math.floor((width - side) / 2),
    originY: Math.floor((height - side) / 2),
    width: side,
    height: side,
  };
}

/**
 * Packs decoded RGBA pixels into the model's input: float32 RGB in 0–255,
 * NHWC. Normalisation lives inside the model graph.
 */
export function rgbaToModelInput(rgba: Uint8Array, pixelCount: number): Float32Array<ArrayBuffer> {
  if (rgba.length < pixelCount * 4) {
    throw new Error(`Expected ${pixelCount * 4} RGBA bytes, got ${rgba.length}`);
  }
  const input = new Float32Array(pixelCount * 3);
  for (let pixel = 0; pixel < pixelCount; pixel++) {
    input.set(rgba.subarray(pixel * 4, pixel * 4 + 3), pixel * 3);
  }
  return input;
}

/**
 * Pairs the model's probabilities with its labels, dropping the catch-all and
 * any label the app has no species for.
 */
export function toPredictions(
  probabilities: ArrayLike<number>,
  model: { labels: readonly string[]; knownSpeciesIds: ReadonlySet<string> },
): SpeciesPrediction[] {
  const { labels, knownSpeciesIds } = model;
  if (probabilities.length !== labels.length) {
    throw new Error(
      `Species model returned ${probabilities.length} scores for ${labels.length} labels`,
    );
  }
  return Array.from(probabilities, (confidence, index) => ({
    speciesId: labels[index] ?? OTHER_LABEL,
    confidence,
  })).filter(({ speciesId }) => speciesId !== OTHER_LABEL && knownSpeciesIds.has(speciesId));
}
