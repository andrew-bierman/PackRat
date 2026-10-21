import type { SpeciesEntry } from '../types';

/** Indexes species by id and records which regions they cover between them. */
export function buildSpeciesPack(species: readonly SpeciesEntry[]) {
  const speciesById: ReadonlyMap<string, SpeciesEntry> = new Map(species.map((s) => [s.id, s]));
  const regions: ReadonlySet<string> = new Set(species.flatMap((s) => s.regions));
  const speciesIds: ReadonlySet<string> = new Set(speciesById.keys());
  return {
    speciesById,
    speciesIds,
    count: speciesById.size,
    /**
     * Drives "no confident match" versus "not in your species packs": one says
     * the subject is unusual, the other that the user is outside what the app
     * knows.
     */
    coversRegion: (region: string) => regions.has(region),
  };
}
