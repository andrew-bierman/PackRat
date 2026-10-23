import { describe, expect, it } from 'vitest';
import { decodePolyline, distanceMeters, encodePolyline, sampleRoute } from '../polyline';
import {
  elevationGain,
  GpxParseError,
  parseGpx,
  simplify,
  summarizeTrack,
  trackDistance,
} from '../trackGeometry';
import {
  distanceUnitFromSpeedUnit,
  elevationValue,
  formatDistance,
  formatElevation,
  formatShortDistance,
  metresFromDistance,
  metresFromElevation,
} from '../units';

describe('polyline', () => {
  it('round-trips Google’s documented example', () => {
    const points = [
      { latitude: 38.5, longitude: -120.2 },
      { latitude: 40.7, longitude: -120.95 },
      { latitude: 43.252, longitude: -126.453 },
    ];
    const encoded = encodePolyline(points);
    expect(encoded).toBe('_p~iF~ps|U_ulLnnqC_mqNvxq`@');
    expect(decodePolyline(encoded)).toEqual(points);
  });

  it('returns nothing for a malformed string', () => {
    expect(decodePolyline('_p~iF~ps|U_')).toEqual([]);
    expect(decodePolyline('_')).toEqual([]);
  });

  it('measures and samples', () => {
    expect(
      distanceMeters({ latitude: 0, longitude: 0 }, { latitude: 0, longitude: 1 }),
    ).toBeCloseTo(111_195, -2);
    expect(sampleRoute([1, 2, 3, 4, 5, 6], 3)).toEqual([1, 3, 5]);
    expect(sampleRoute([1, 2], 10)).toEqual([1, 2]);
  });
});

const GPX = `<?xml version="1.0"?>
<gpx version="1.1" xmlns="http://www.topografix.com/GPX/1/1">
  <rte><rtept lat="1" lon="1"/></rte>
  <trk><trkseg>
    <trkpt lat="37.0" lon="-119.0"><ele>100</ele></trkpt>
    <trkpt lon="-119.001" lat='37.001'><ele> 102 </ele></trkpt>
    <trkpt lat="37.002" lon="-119.002"><ele>110</ele><time>x</time></trkpt>
    <trkpt lat="37.003" lon="-119.003"><ele>bad</ele></trkpt>
    <trkpt lat="95" lon="0"/>
    <trkpt lat="x" lon="0"/>
  </trkseg></trk>
</gpx>`;

describe('parseGpx', () => {
  it('prefers track points and reads elevations', () => {
    const points = parseGpx(GPX);
    expect(points).toHaveLength(4);
    expect(points.map((p) => p.elevation)).toEqual([100, 102, 110, null]);
  });

  it('falls back to route points and reads namespaced elements', () => {
    const points = parseGpx(
      '<gpx:gpx><gpx:rtept lat="1" lon="2"><gpx:ele>5</gpx:ele></gpx:rtept></gpx:gpx>',
    );
    expect(points).toEqual([{ latitude: 1, longitude: 2, elevation: 5 }]);
  });

  it('rejects files that are not GPX or hold no points', () => {
    expect(() => parseGpx('<kml></kml>')).toThrow(GpxParseError);
    expect(() => parseGpx('<gpx></gpx>')).toThrow(/no track points/);
  });
});

describe('track maths', () => {
  it('summarises a track', () => {
    const summary = summarizeTrack(parseGpx(GPX));
    expect(summary?.distanceMeters).toBeGreaterThan(400);
    expect(summary?.elevationGainMeters).toBe(10);
    expect(decodePolyline(summary?.route ?? '').length).toBeGreaterThanOrEqual(2);
    expect(summarizeTrack([{ latitude: 0, longitude: 0, elevation: null }])).toBeNull();
  });

  it('ignores elevation jitter under the threshold', () => {
    const at = (elevation: number | null) => ({ latitude: 0, longitude: 0, elevation });
    expect(elevationGain([at(100), at(102), at(99), at(104)])).toBe(5);
    expect(elevationGain([at(100), at(null)])).toBeNull();
    expect(trackDistance([])).toBe(0);
  });

  it('simplifies a straight line to its ends and tightens to fit', () => {
    const line = Array.from({ length: 50 }, (_, i) => ({
      latitude: 0,
      longitude: i * 0.001,
      elevation: null,
    }));
    expect(simplify(line)).toHaveLength(2);
    const zigzag = Array.from({ length: 50 }, (_, i) => ({
      latitude: (i % 2) * 0.01,
      longitude: i * 0.001,
      elevation: null,
    }));
    expect(simplify(zigzag, { maxPoints: 10 }).length).toBeLessThanOrEqual(10);
    const loop = [
      { latitude: 0, longitude: 0, elevation: null },
      { latitude: 0.01, longitude: 0, elevation: null },
      { latitude: 0, longitude: 0, elevation: null },
    ];
    expect(simplify(loop)).toHaveLength(3);
    expect(simplify(loop.slice(0, 2))).toHaveLength(2);
  });
});

describe('units', () => {
  it('follows the speed unit', () => {
    expect(distanceUnitFromSpeedUnit('mph')).toBe('imperial');
    expect(distanceUnitFromSpeedUnit('kmh')).toBe('metric');
  });

  it('converts and formats', () => {
    expect(formatDistance(12_400, 'metric')).toBe('12.4 km');
    expect(formatDistance(160_934.4, 'imperial')).toBe('100 mi');
    expect(formatElevation(1000, 'imperial')).toBe('3,281 ft');
    expect(formatElevation(1000, 'metric')).toBe('1,000 m');
    expect(formatShortDistance(648, 'metric')).toBe('650 m');
    expect(formatShortDistance(2500, 'metric')).toBe('2.5 km');
    expect(formatShortDistance(32_186.88, 'imperial')).toBe('20 mi');
    expect(metresFromDistance(1, 'imperial')).toBe(1609.344);
    expect(metresFromDistance(1, 'metric')).toBe(1000);
    expect(metresFromElevation(1, 'imperial')).toBe(0.3048);
    expect(metresFromElevation(1, 'metric')).toBe(1);
    expect(elevationValue(3.048, 'imperial')).toBeCloseTo(10);
  });
});
