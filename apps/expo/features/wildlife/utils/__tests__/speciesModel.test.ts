import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SPECIES_DATABASE } from '../../data/speciesDatabase';
import { regionForCoordinate } from '../region';
import { centerCropRect, OTHER_LABEL, rgbaToModelInput, toPredictions } from '../speciesModel';

describe('centerCropRect', () => {
  it('takes the largest centred square', () => {
    expect(centerCropRect({ width: 400, height: 300 })).toEqual({
      originX: 50,
      originY: 0,
      width: 300,
      height: 300,
    });
    expect(centerCropRect({ width: 301, height: 500 })).toEqual({
      originX: 0,
      originY: 99,
      width: 301,
      height: 301,
    });
  });
});

describe('rgbaToModelInput', () => {
  it('drops alpha and keeps 0–255 RGB in pixel order', () => {
    const rgba = new Uint8Array([10, 20, 30, 255, 40, 50, 60, 0]);
    expect(Array.from(rgbaToModelInput({ rgba, pixelCount: 2 }))).toEqual([10, 20, 30, 40, 50, 60]);
  });

  it('rejects a buffer too small for the pixel count', () => {
    expect(() => rgbaToModelInput({ rgba: new Uint8Array(4), pixelCount: 2 })).toThrow(
      'Expected 8 RGBA bytes, got 4',
    );
  });
});

describe('toPredictions', () => {
  it('pairs scores with labels and drops the catch-all and unknown labels', () => {
    const labels = ['deer', 'yeti', OTHER_LABEL];
    expect(
      toPredictions({ probabilities: [0.5, 0.3, 0.2], labels, knownSpeciesIds: new Set(['deer']) }),
    ).toEqual([{ speciesId: 'deer', confidence: 0.5 }]);
  });

  it('rejects an output that does not match the labels', () => {
    expect(() =>
      toPredictions({ probabilities: [1], labels: ['a', 'b'], knownSpeciesIds: new Set() }),
    ).toThrow('Species model returned 1 scores for 2 labels');
  });
});

describe('bundled species model', () => {
  const labels: string[] = JSON.parse(
    readFileSync(
      resolve(__dirname, '../../../../assets/models/wildlife-species.labels.json'),
      'utf8',
    ),
  );

  it('has a label for every species in the database', () => {
    const missing = SPECIES_DATABASE.map((s) => s.id).filter((id) => !labels.includes(id));
    expect(missing).toEqual([]);
  });
});

describe('regionForCoordinate', () => {
  it.each([
    { lat: 40.7, lon: -74, region: 'north-america' },
    { lat: -23.5, lon: -46.6, region: 'south-america' },
    { lat: 48.8, lon: 2.3, region: 'europe' },
    { lat: -1.3, lon: 36.8, region: 'africa' },
    { lat: 35.7, lon: 139.7, region: 'asia' },
    { lat: -33.9, lon: 151.2, region: 'oceania' },
    { lat: -80, lon: 0, region: null },
  ])('maps $lat,$lon to $region', ({ lat, lon, region }) => {
    expect(regionForCoordinate({ latitude: lat, longitude: lon })).toBe(region);
  });

  it('treats the upper latitude edge of half-open boxes as exclusive', () => {
    expect(regionForCoordinate({ latitude: 7, longitude: -60 })).toBe('north-america');
    expect(regionForCoordinate({ latitude: 35, longitude: 10 })).toBe('europe');
  });
});
