import { describe, expect, it } from 'vitest';
import type { IdentificationResult, SpeciesEntry } from '../../types';
import { clearsFloor, displayPercentage, isConfident } from '../confidencePolicy';
import { mergeServerResults, rankPredictions } from '../identificationRanker';
import { buildSpeciesPack } from '../speciesPack';

function species(id: string, overrides: Partial<SpeciesEntry> = {}): SpeciesEntry {
  return {
    id,
    commonName: id,
    scientificName: id,
    category: 'mammal',
    description: '',
    habitat: [],
    regions: ['north-america'],
    dangerLevel: 'safe',
    characteristics: [],
    ...overrides,
  };
}

const pack = buildSpeciesPack([
  species('deer'),
  species('bear', { dangerLevel: 'dangerous' }),
  species('badger', { regions: ['europe'] }),
  species('fox', { regions: [] }),
  species('moose'),
  species('elk'),
  species('owl'),
]);

function rank(
  predictions: { speciesId: string; confidence: number }[],
  {
    region = null,
    regionIsCovered = true,
  }: { region?: string | null; regionIsCovered?: boolean } = {},
) {
  return rankPredictions({
    predictions,
    speciesById: pack.speciesById,
    source: 'offline',
    region,
    regionIsCovered,
  });
}

function ids(outcome: ReturnType<typeof rank>) {
  return outcome.kind === 'ranked' ? outcome.results.map((r) => r.species.id) : outcome.kind;
}

describe('confidencePolicy', () => {
  it('holds dangerous species to a lower inclusion floor', () => {
    expect(clearsFloor({ confidence: 0.1, dangerLevel: 'safe' })).toBe(false);
    expect(clearsFloor({ confidence: 0.15, dangerLevel: 'safe' })).toBe(true);
    expect(clearsFloor({ confidence: 0.05, dangerLevel: 'dangerous' })).toBe(true);
    expect(clearsFloor({ confidence: 0.04, dangerLevel: 'dangerous' })).toBe(false);
  });

  it('only calls 65% and above confident', () => {
    expect(isConfident(0.6499)).toBe(false);
    expect(isConfident(0.65)).toBe(true);
  });

  it('never rounds confidence up', () => {
    expect(displayPercentage(0.649)).toBe(64);
    expect(displayPercentage(0.999)).toBe(99);
  });
});

describe('rankPredictions', () => {
  it('orders by confidence and reports the model confidence and source', () => {
    const outcome = rank([
      { speciesId: 'deer', confidence: 0.2 },
      { speciesId: 'moose', confidence: 0.7 },
    ]);
    expect(outcome).toEqual({
      kind: 'ranked',
      results: [
        { species: pack.speciesById.get('moose'), confidence: 0.7, source: 'offline' },
        { species: pack.speciesById.get('deer'), confidence: 0.2, source: 'offline' },
      ],
    });
  });

  it('drops predictions below the floor but keeps a weak dangerous match', () => {
    const outcome = rank([
      { speciesId: 'deer', confidence: 0.6 },
      { speciesId: 'moose', confidence: 0.1 },
      { speciesId: 'bear', confidence: 0.06 },
    ]);
    expect(ids(outcome)).toEqual(['deer', 'bear']);
  });

  it('ignores ids the pack does not know', () => {
    expect(ids(rank([{ speciesId: 'yeti', confidence: 0.9 }]))).toBe('noConfidentMatch');
  });

  it('demotes species outside the region without changing their confidence', () => {
    const outcome = rank(
      [
        { speciesId: 'badger', confidence: 0.5 },
        { speciesId: 'deer', confidence: 0.3 },
      ],
      { region: 'north-america' },
    );
    expect(ids(outcome)).toEqual(['deer', 'badger']);
    expect(outcome.kind === 'ranked' && outcome.results[1]?.confidence).toBe(0.5);
  });

  it('does not demote species with no recorded regions, or when there is no region', () => {
    expect(
      ids(
        rank(
          [
            { speciesId: 'fox', confidence: 0.5 },
            { speciesId: 'deer', confidence: 0.3 },
          ],
          { region: 'north-america' },
        ),
      ),
    ).toEqual(['fox', 'deer']);
    expect(
      ids(
        rank([
          { speciesId: 'badger', confidence: 0.5 },
          { speciesId: 'deer', confidence: 0.3 },
        ]),
      ),
    ).toEqual(['badger', 'deer']);
  });

  it('breaks ties by name and caps the list at five', () => {
    const outcome = rank(
      ['owl', 'moose', 'elk', 'deer', 'fox', 'bear'].map((speciesId) => ({
        speciesId,
        confidence: 0.3,
      })),
    );
    expect(ids(outcome)).toEqual(['bear', 'deer', 'elk', 'fox', 'moose']);
  });

  it('distinguishes an unusual subject from one outside the covered regions', () => {
    const weak = [{ speciesId: 'deer', confidence: 0.05 }];
    expect(ids(rank(weak, { region: 'north-america', regionIsCovered: true }))).toBe(
      'noConfidentMatch',
    );
    expect(ids(rank(weak, { region: 'oceania', regionIsCovered: false }))).toBe(
      'outsideLoadedPacks',
    );
  });
});

describe('mergeServerResults', () => {
  const onDevice = (id: string, confidence: number) =>
    ({ species: species(id), confidence, source: 'offline' }) satisfies IdentificationResult;
  const fromServer = (id: string, confidence: number) =>
    ({ species: species(id), confidence, source: 'online' }) satisfies IdentificationResult;

  it('keeps the local answer unless the server is meaningfully more confident', () => {
    const local = [onDevice('deer', 0.6)];
    const close = [fromServer('elk', 0.7)];
    const clear = [fromServer('elk', 0.75)];
    expect(mergeServerResults({ local: local, server: close })).toBe(local);
    expect(mergeServerResults({ local: local, server: clear })).toBe(clear);
  });

  it('falls back to whichever side has an answer', () => {
    const local = [onDevice('deer', 0.6)];
    const server = [fromServer('elk', 0.2)];
    expect(mergeServerResults({ local: local, server: [] })).toBe(local);
    expect(mergeServerResults({ local: [], server: server })).toBe(server);
  });
});

describe('buildSpeciesPack', () => {
  it('indexes species and the regions they cover', () => {
    expect(pack.count).toBe(7);
    expect(pack.speciesIds.has('bear')).toBe(true);
    expect(pack.coversRegion('europe')).toBe(true);
    expect(pack.coversRegion('oceania')).toBe(false);
  });
});
