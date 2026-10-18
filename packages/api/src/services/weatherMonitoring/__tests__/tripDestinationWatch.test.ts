import type { ValidatedEnv } from '@packrat/api/utils/env-validation';
import type { WeatherAlertItem } from '@packrat/schemas/weather';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  stateRows: [] as { lastAlertIds: string[] | null }[],
  insertValues: vi.fn(),
  onConflictDoUpdate: vi.fn(),
  fetchCoordinateAlerts: vi.fn(),
  notifyTripOwner: vi.fn(),
}));

vi.mock('@packrat/api/db', () => ({
  createDbClient: () => {
    const db = {
      tag: (_label: string) => db,
      select: () => ({
        from: () => ({ leftJoin: () => ({ where: async () => mocks.stateRows }) }),
      }),
      insert: () => ({
        values: (values: unknown) => {
          mocks.insertValues(values);
          return { onConflictDoUpdate: mocks.onConflictDoUpdate };
        },
      }),
    };
    return db;
  },
}));
vi.mock('../fetchLocationAlerts', () => ({ fetchCoordinateAlerts: mocks.fetchCoordinateAlerts }));
vi.mock('../../push/notifyTripOwner', () => ({ notifyTripOwner: mocks.notifyTripOwner }));
vi.mock('@packrat/db/schema', () => ({
  trips: { id: 'id', deleted: 'deleted' },
  tripDestinationAlertState: { tripId: 'tripId', lastAlertIds: 'lastAlertIds' },
}));

const {
  POLL_INTERVAL_MS,
  deliverTripDestinationAlerts,
  tickTripDestination,
  tripWatchFor,
  watchWindow,
} = await import('../tripDestinationWatch');

const env = {} as ValidatedEnv;
const DAY = 24 * 60 * 60 * 1000;
const START = new Date('2026-10-20T12:00:00Z').getTime();
const FLOOD_ID = 'Flood Warning|2026-10-19T00:00:00Z';

function alert(event: string): WeatherAlertItem {
  return {
    event,
    effective: '2026-10-19T00:00:00Z',
    headline: event,
    desc: '',
  } as WeatherAlertItem;
}

const watch = {
  tripId: 'trip-1',
  userId: 'user-1',
  name: 'Big Sur',
  location: { latitude: 36.27, longitude: -121.8, name: 'Big Sur' },
  startDate: START,
};

const tripRow = {
  id: 'trip-1',
  userId: 'user-1',
  name: 'Big Sur',
  deleted: false,
  location: watch.location,
  startDate: new Date(START),
};

beforeEach(() => {
  vi.clearAllMocks();
  mocks.stateRows = [{ lastAlertIds: [] }];
  mocks.fetchCoordinateAlerts.mockResolvedValue([]);
  mocks.onConflictDoUpdate.mockResolvedValue(undefined);
  mocks.notifyTripOwner.mockResolvedValue(undefined);
});

describe('watchWindow', () => {
  it('opens 10 days before departure and closes a day after', () => {
    expect(watchWindow(START)).toEqual({ opensAt: START - 10 * DAY, closesAt: START + DAY });
  });
});

describe('tripWatchFor', () => {
  it("builds the watch from the trip's details", () => {
    expect(tripWatchFor({ trip: tripRow, now: START - 30 * DAY })).toEqual(watch);
  });

  it.each([
    ['deleted', { deleted: true }],
    ['without a destination', { location: null }],
    ['without a start date', { startDate: null }],
  ])('returns null for a trip %s', (_label, patch) => {
    expect(tripWatchFor({ trip: { ...tripRow, ...patch }, now: START })).toBeNull();
  });

  it('returns null once the window has closed', () => {
    expect(tripWatchFor({ trip: tripRow, now: START + 2 * DAY })).toBeNull();
  });
});

describe('tickTripDestination', () => {
  const run = (overrides: { now: number; seenIds?: string[]; enabled?: boolean }) =>
    tickTripDestination({ env, watch, seenIds: [], enabled: true, ...overrides });

  it('sleeps until the window opens without checking', async () => {
    const result = await run({ now: START - 20 * DAY });
    expect(result).toEqual({ seenIds: [], nextAt: START - 10 * DAY, notified: false });
    expect(mocks.fetchCoordinateAlerts).not.toHaveBeenCalled();
  });

  it('stops once the window has closed', async () => {
    const result = await run({ now: START + 2 * DAY });
    expect(result.nextAt).toBeNull();
    expect(mocks.fetchCoordinateAlerts).not.toHaveBeenCalled();
  });

  it('keeps time without checking while the feature is off', async () => {
    const now = START - DAY;
    const result = await run({ now, enabled: false });
    expect(result).toEqual({ seenIds: [], nextAt: now + POLL_INTERVAL_MS, notified: false });
    expect(mocks.fetchCoordinateAlerts).not.toHaveBeenCalled();
  });

  it('leaves Postgres alone when nothing new is active', async () => {
    mocks.fetchCoordinateAlerts.mockResolvedValue([alert('Flood Warning')]);
    const now = START - DAY;
    const result = await run({ now, seenIds: [FLOOD_ID] });
    expect(result).toEqual({
      seenIds: [FLOOD_ID],
      nextAt: now + POLL_INTERVAL_MS,
      notified: false,
    });
    expect(mocks.insertValues).not.toHaveBeenCalled();
    expect(mocks.notifyTripOwner).not.toHaveBeenCalled();
  });

  it('pushes a new alert and remembers it', async () => {
    mocks.fetchCoordinateAlerts.mockResolvedValue([alert('Flood Warning')]);
    const now = START - DAY;
    const result = await run({ now });
    expect(mocks.fetchCoordinateAlerts).toHaveBeenCalledWith(watch.location);
    expect(result).toEqual({ seenIds: [FLOOD_ID], nextAt: now + POLL_INTERVAL_MS, notified: true });
  });

  it('stops when the trip has been deleted', async () => {
    mocks.fetchCoordinateAlerts.mockResolvedValue([alert('Flood Warning')]);
    mocks.stateRows = [];
    const result = await run({ now: START - DAY });
    expect(result).toEqual({ seenIds: [FLOOD_ID], nextAt: null, notified: false });
  });
});

describe('deliverTripDestinationAlerts', () => {
  const now = new Date(START - DAY);

  it('pushes the new alert to the owner and records it', async () => {
    const result = await deliverTripDestinationAlerts({
      env,
      watch,
      alerts: [alert('Flood Warning')],
      now,
    });
    expect(result).toEqual({ gone: false, notified: true });
    expect(mocks.insertValues).toHaveBeenCalledWith({
      tripId: 'trip-1',
      lastAlertIds: [FLOOD_ID],
      lastPolledAt: now,
      updatedAt: now,
    });
    expect(mocks.notifyTripOwner).toHaveBeenCalledWith({
      env,
      userId: 'user-1',
      tripId: 'trip-1',
      tripName: 'Big Sur',
      placeName: 'Big Sur',
      newAlerts: [alert('Flood Warning')],
    });
  });

  it('does not push an alert Postgres says was already sent', async () => {
    mocks.stateRows = [{ lastAlertIds: [FLOOD_ID] }];
    const result = await deliverTripDestinationAlerts({
      env,
      watch,
      alerts: [alert('Flood Warning')],
      now,
    });
    expect(result).toEqual({ gone: false, notified: false });
    expect(mocks.notifyTripOwner).not.toHaveBeenCalled();
  });

  it('treats a trip with no saved state as having seen nothing', async () => {
    mocks.stateRows = [{ lastAlertIds: null }];
    const result = await deliverTripDestinationAlerts({
      env,
      watch: { ...watch, location: { latitude: 1, longitude: 2 } },
      alerts: [alert('Flood Warning')],
      now,
    });
    expect(result.notified).toBe(true);
    expect(mocks.notifyTripOwner).toHaveBeenCalledWith(
      expect.objectContaining({ placeName: null }),
    );
  });

  it('reports a deleted trip as gone without writing', async () => {
    mocks.stateRows = [];
    const result = await deliverTripDestinationAlerts({
      env,
      watch,
      alerts: [alert('Flood Warning')],
      now,
    });
    expect(result).toEqual({ gone: true, notified: false });
    expect(mocks.insertValues).not.toHaveBeenCalled();
  });
});
