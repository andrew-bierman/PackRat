import * as Sentry from '@sentry/react-native';
import speciesModelLabels from 'expo-app/assets/models/wildlife-species.labels.json';
import { File } from 'expo-file-system';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import jpeg from 'jpeg-js';
import { loadTensorflowModel, type TfliteModel } from 'react-native-fast-tflite';
import type { SpeciesPrediction } from '../utils/identificationRanker';
import {
  centerCropRect,
  MODEL_INPUT_SIZE,
  rgbaToModelInput,
  toPredictions,
} from '../utils/speciesModel';

/**
 * The on-device recogniser: the same MobileNetV4 species model the iOS app
 * ships, exported to TFLite by `apps/swift/ml/species-model/export_tflite.py`.
 *
 * Loaded once per process and shared — reading 17 MB and building the
 * interpreter is the slow part, and it should not repeat every time the screen
 * opens. A load failure resolves to null so the screen can say the recogniser
 * is unavailable instead of crashing.
 */
let modelPromise: Promise<TfliteModel | null> | null = null;

export function loadSpeciesModel(): Promise<TfliteModel | null> {
  modelPromise ??= loadTensorflowModel(
    require('expo-app/assets/models/wildlife-species.tflite'),
    [],
  ).catch((error: unknown) => {
    Sentry.captureException(error, { tags: { feature: 'wildlife', action: 'loadSpeciesModel' } });
    modelPromise = null;
    return null;
  });
  return modelPromise;
}

/**
 * Centre-crops and scales the photo to the model's input, then decodes it to
 * pixels. The manipulator applies EXIF orientation, so a portrait photo is not
 * classified on its side.
 */
async function modelInputFor(imageUri: string): Promise<Float32Array<ArrayBuffer>> {
  const original = await ImageManipulator.manipulate(imageUri).renderAsync();
  const crop = centerCropRect(original);
  original.release();

  const scaled = await ImageManipulator.manipulate(imageUri)
    .crop(crop)
    .resize({ width: MODEL_INPUT_SIZE, height: MODEL_INPUT_SIZE })
    .renderAsync();
  const saved = await scaled.saveAsync({ format: SaveFormat.JPEG, compress: 1 });
  scaled.release();

  const file = new File(saved.uri);
  try {
    const decoded = jpeg.decode(await file.bytes(), { useTArray: true, formatAsRGBA: true });
    return rgbaToModelInput({
      rgba: decoded.data,
      pixelCount: MODEL_INPUT_SIZE * MODEL_INPUT_SIZE,
    });
  } finally {
    file.delete();
  }
}

/**
 * Classifies a photo against `knownSpeciesIds`, returning predictions in no
 * particular order — ranking is the caller's job.
 */
export async function classifySpecies(opts: {
  model: TfliteModel;
  imageUri: string;
  knownSpeciesIds: ReadonlySet<string>;
}): Promise<SpeciesPrediction[]> {
  const { model, imageUri, knownSpeciesIds } = opts;
  const input = await modelInputFor(imageUri);
  const [output] = await model.run([input.buffer]);
  if (!output) throw new Error('Species model returned no output');
  return toPredictions({
    probabilities: new Float32Array(output),
    labels: speciesModelLabels,
    knownSpeciesIds,
  });
}
