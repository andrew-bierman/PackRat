import type { TrailConditionReport } from '@packrat/db/schema';
import { describe, expect, it } from 'vitest';
import { distanceMeters, rankNearbyReports, TRIP_REPORT_LIMIT } from '../tripTrailConditions';

const YOSEMITE_VALLEY = { latitude: 37.7459, longitude: -119.5332 };
// A pin about 4 km east of the valley.
const PIN = { latitude: 37.7459, longitude: -119.5332 + 0.05 };

const report = (overrides: Partial<TrailConditionReport>): TrailConditionReport => ({
  id: 'r',
  trailId: null,
  trailName: 'Trail',
  trailRegion: null,
  latitude: null,
  longitude: null,
  surface: 'dirt',
  overallCondition: 'good',
  hazards: [],
  waterCrossings: 0,
  waterCrossingDifficulty: null,
  notes: null,
  photos: [],
  userId: 'u',
  tripId: null,
  deleted: false,
  localCreatedAt: new Date('2026-10-01T00:00:00Z'),
  localUpdatedAt: new Date('2026-10-01T00:00:00Z'),
  createdAt: new Date('2026-10-01T00:00:00Z'),
  updatedAt: new Date('2026-10-01T00:00:00Z'),
  ...overrides,
});

describe('distanceMeters', () => {
  it('measures Yosemite Valley to Half Dome summit at about 4 km', () => {
    const d = distanceMeters(YOSEMITE_VALLEY, { latitude: 37.7459, longitude: -119.5332 + 0.0455 });
    expect(Math.round(d / 100)).toBe(40);
  });

  it('is zero between a point and itself', () => {
    expect(distanceMeters(YOSEMITE_VALLEY, YOSEMITE_VALLEY)).toBe(0);
  });
});

describe('rankNearbyReports', () => {
  it('orders trail and pin reports nearest first, labelled with their distance', () => {
    const ranked = rankNearbyReports({
      origin: YOSEMITE_VALLEY,
      trailDistances: new Map([
        ['far-trail', 9_000.4],
        ['near-trail', 1_200.6],
      ]),
      trailReports: [
        report({ id: 'far', trailId: 'far-trail' }),
        report({ id: 'near', trailId: 'near-trail' }),
      ],
      pinReports: [report({ id: 'pin', ...PIN })],
    });

    expect(Math.round(distanceMeters(YOSEMITE_VALLEY, PIN) / 1000)).toBe(4);
    expect(ranked.map((r) => [r.id, r.distanceM])).toEqual([
      ['near', 1201],
      ['pin', Math.round(distanceMeters(YOSEMITE_VALLEY, PIN))],
      ['far', 9000],
    ]);
  });

  it('puts the more recently written report first when two are the same distance away', () => {
    const ranked = rankNearbyReports({
      origin: YOSEMITE_VALLEY,
      trailDistances: new Map([
        ['a', 500],
        ['b', 500],
      ]),
      trailReports: [
        report({ id: 'older', trailId: 'a', localCreatedAt: new Date('2026-09-01T00:00:00Z') }),
        report({ id: 'newer', trailId: 'b', localCreatedAt: new Date('2026-10-05T00:00:00Z') }),
      ],
      pinReports: [],
    });

    expect(ranked.map((r) => r.id)).toEqual(['newer', 'older']);
  });

  it('drops pins beyond the trip radius and trail reports for trails not nearby', () => {
    const ranked = rankNearbyReports({
      origin: YOSEMITE_VALLEY,
      trailDistances: new Map([['near-trail', 100]]),
      trailReports: [report({ id: 'stray', trailId: 'other-trail' })],
      pinReports: [
        report({ id: 'far-pin', latitude: 38.2, longitude: -119.5332 }), // ≈ 50 km
        report({ id: 'no-coords' }),
      ],
    });

    expect(ranked).toEqual([]);
  });

  it(`keeps at most ${TRIP_REPORT_LIMIT} reports`, () => {
    const ids = Array.from({ length: 8 }, (_, i) => `t${i}`);
    const ranked = rankNearbyReports({
      origin: YOSEMITE_VALLEY,
      trailDistances: new Map(ids.map((id, i) => [id, i * 100])),
      trailReports: ids.map((id) => report({ id, trailId: id })),
      pinReports: [],
    });

    expect(ranked.map((r) => r.id)).toEqual(['t0', 't1', 't2', 't3', 't4']);
  });
});
