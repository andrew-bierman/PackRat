import * as Sentry from '@sentry/react-native';
import type { SelectedImage } from 'expo-app/features/packs/hooks/useImagePicker';
import { File, Paths } from 'expo-file-system';
import { useCallback, useRef, useState } from 'react';
import { SPECIES_DATABASE } from '../data/speciesDatabase';
import { classifySpecies, loadSpeciesModel } from '../lib/onDeviceClassifier';
import type { IdentificationResult } from '../types';
import { mergeServerResults, rankPredictions } from '../utils/identificationRanker';
import { buildSpeciesPack } from '../utils/speciesPack';
import { identifyOnline } from './useWildlifeIdentification';

const speciesPack = buildSpeciesPack(SPECIES_DATABASE);

/**
 * The upload works from its own copy: saving the sighting moves the picked
 * photo out of the picker's cache while the upload may still be reading it.
 */
function copyForUpload(image: SelectedImage): { image: SelectedImage; file: File } {
  const file = new File(Paths.cache, `wildlife-refine-${Date.now()}.jpg`);
  new File(image.uri).copySync(file);
  return { image: { ...image, uri: file.uri }, file };
}

export const ON_DEVICE_SPECIES_COUNT = speciesPack.count;

export type OnDeviceIdentificationState =
  | { status: 'idle' }
  | { status: 'identifying' }
  | { status: 'results'; results: IdentificationResult[]; isRefining: boolean }
  | { status: 'noConfidentMatch' }
  /** Nothing plausible and the user is outside every region the species cover. */
  | { status: 'outsideLoadedPacks' }
  | { status: 'modelUnavailable' }
  | { status: 'failed' };

/**
 * Drives one identification, local-first.
 *
 * The on-device model answers every identification; the server is consulted
 * afterwards and replaces the answer only when it is meaningfully more
 * confident. Server-first-with-local-fallback would make the offline path a
 * mode that only runs once something has gone wrong — and nobody notices when
 * that path rots.
 */
export function useOnDeviceIdentification() {
  const [state, setState] = useState<OnDeviceIdentificationState>({ status: 'idle' });
  // Guards against a slow identification landing after the user picked another photo.
  const requestId = useRef(0);

  const reset = useCallback(() => {
    requestId.current += 1;
    setState({ status: 'idle' });
  }, []);

  const identify = useCallback(
    async (opts: {
      selectedImage: SelectedImage;
      region: string | null;
      /** Called once with the on-device answer, and again if the server supersedes it. */
      onResults: (results: IdentificationResult[], phase: 'local' | 'refined') => void;
    }) => {
      const { selectedImage, region, onResults } = opts;
      const id = ++requestId.current;
      const isCurrent = () => requestId.current === id;
      setState({ status: 'identifying' });

      const model = await loadSpeciesModel();
      if (!isCurrent()) return;
      if (!model) {
        setState({ status: 'modelUnavailable' });
        return;
      }

      let local: IdentificationResult[];
      try {
        Sentry.addBreadcrumb({
          category: 'wildlife',
          message: 'Classifying on device',
          level: 'info',
          data: { region },
        });
        const predictions = await classifySpecies({
          model,
          imageUri: selectedImage.uri,
          knownSpeciesIds: speciesPack.speciesIds,
        });
        const outcome = rankPredictions({
          predictions,
          speciesById: speciesPack.speciesById,
          source: 'offline',
          region,
          regionIsCovered: region ? speciesPack.coversRegion(region) : true,
        });
        if (!isCurrent()) return;
        if (outcome.kind !== 'ranked') {
          setState({ status: outcome.kind });
          return;
        }
        local = outcome.results;
      } catch (error) {
        console.warn('On-device identification failed:', error);
        Sentry.captureException(error, {
          tags: { feature: 'wildlife', action: 'classifyOnDevice' },
          extra: { imageFileName: selectedImage.fileName },
        });
        if (isCurrent()) setState({ status: 'failed' });
        return;
      }

      setState({ status: 'results', results: local, isRefining: true });
      let upload: ReturnType<typeof copyForUpload> | null = null;
      try {
        upload = copyForUpload(selectedImage);
      } catch (error) {
        Sentry.captureException(error, { tags: { feature: 'wildlife', action: 'copyForUpload' } });
      }
      onResults(local, 'local');

      // Best-effort: the user already has an answer, and being unreachable is
      // the expected case in the field. identifyOnline reports server errors itself.
      let refined = local;
      try {
        if (upload) refined = mergeServerResults(local, await identifyOnline(upload.image));
      } catch {
        // The local answer stands.
      } finally {
        if (upload?.file.exists) upload.file.delete();
      }
      if (!isCurrent()) return;
      setState({ status: 'results', results: refined, isRefining: false });
      if (refined !== local) onResults(refined, 'refined');
    },
    [],
  );

  return { state, identify, reset };
}
