/**
 * Maps a coordinate to the coarse region vocabulary species entries use
 * (`north-america`, `europe`, `asia`, …).
 *
 * Bounding boxes rather than a geocoder: this has to work with no network, and
 * it only needs to be right at continent scale to be useful as a ranking
 * prior. A coordinate outside every box yields null, which the ranker treats
 * as "no prior". Boxes match the iOS app's `WildlifeLocationProvider`.
 */
const REGION_BOXES = Object.freeze([
  { region: 'north-america', lat: [7, 84], lon: [-170, -50] },
  { region: 'south-america', lat: [-56, 7], lon: [-92, -34], latExclusiveMax: true },
  { region: 'europe', lat: [35, 72], lon: [-25, 45] },
  { region: 'africa', lat: [-35, 35], lon: [-18, 52], latExclusiveMax: true },
  { region: 'asia', lat: [5, 78], lon: [45, 180] },
  { region: 'oceania', lat: [-48, -10], lon: [110, 180], latExclusiveMax: true },
] as const);

export function regionForCoordinate({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): string | null {
  for (const box of REGION_BOXES) {
    const [minLat, maxLat] = box.lat;
    const [minLon, maxLon] = box.lon;
    const exclusive = 'latExclusiveMax' in box && box.latExclusiveMax;
    const inLat = latitude >= minLat && (exclusive ? latitude < maxLat : latitude <= maxLat);
    if (inLat && longitude >= minLon && longitude <= maxLon) return box.region;
  }
  return null;
}
