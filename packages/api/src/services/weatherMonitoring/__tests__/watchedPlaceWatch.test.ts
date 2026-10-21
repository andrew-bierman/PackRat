import type { ValidatedEnv } from '@packrat/api/utils/env-validation';
import type { WeatherAlertItem } from '@packrat/schemas/weather';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  stateRows: [] as { lastAlertIds: string[]; activeSince: Date | null }[],
  insertValues: vi.fn(),
  onConflictDoUpdate: vi.fn(),
  fetchLocationAlerts: vi.fn(),
  notifyWatchers: vi.fn(),
}));

vi.mock('@packrat/api/db', () => ({
  createDbClient: () => {
    const db = {
      tag: (_label: string) => db,
      select: () => ({ from: () => ({ where: async () => mocks.stateRows }) }),
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
vi.mock('../fetchLocationAlerts', () => ({ fetchLocationAlerts: mocks.fetchLocationAlerts }));
vi.mock('../../push/notifyWatchers', () => ({ notifyWatchers: mocks.notifyWatchers }));
vi.mock('@packrat/db/schema', () => ({
  weatherLocationAlertState: {
    weatherLocationId: 'weatherLocationId',
    lastAlertIds: 'lastAlertIds',
    activeSince: 'activeSince',
  },
}));

const { BASELINE_INTERVAL_MS, ELEVATED_INTERVAL_MS, deliverWatchedPlaceAlerts, tickWatchedPlace } =
  await import('../watchedPlaceWatch');

const env = {} as ValidatedEnv;
const NOW = new Date('2026-10-18T12:00:00Z').getTime();
const FLOOD_ID = 'Flood Warning|2026-10-18T00:00:00Z';

function alert(event: string): WeatherAlertItem {
  return {
    event,
    effective: '2026-10-18T00:00:00Z',
    headline: event,
    desc: '',
  } as WeatherAlertItem;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.stateRows = [];
  mocks.fetchLocationAlerts.mockResolvedValue([]);
  mocks.onConflictDoUpdate.mockResolvedValue(undefined);
  mocks.notifyWatchers.mockResolvedValue({ watchers: 2 });
});

describe('tickWatchedPlace', () => {
  const run = (overrides: { seenIds?: string[]; enabled?: boolean } = {}) =>
    tickWatchedPlace({
      env,
      weatherLocationId: 42,
      seenIds: [],
      enabled: true,
      now: NOW,
      ...overrides,
    });

  it('keeps time without checking while the feature is off', async () => {
    const result = await run({ enabled: false, seenIds: [FLOOD_ID] });
    expect(result).toEqual({
      seenIds: [FLOOD_ID],
      nextAt: NOW + BASELINE_INTERVAL_MS,
      notified: false,
    });
    expect(mocks.fetchLocationAlerts).toHaveBeenCalledTimes(0);
  });

  it('checks again in 30 minutes when the place is clear', async () => {
    const result = await run({ seenIds: [FLOOD_ID] });
    expect(mocks.fetchLocationAlerts).toHaveBeenCalledWith(42);
    expect(result).toEqual({ seenIds: [], nextAt: NOW + BASELINE_INTERVAL_MS, notified: false });
    expect(mocks.insertValues).toHaveBeenCalledTimes(0);
  });

  it('checks every 15 minutes while an alert it already saw is active, without Postgres', async () => {
    mocks.fetchLocationAlerts.mockResolvedValue([alert('Flood Warning')]);
    const result = await run({ seenIds: [FLOOD_ID] });
    expect(result).toEqual({
      seenIds: [FLOOD_ID],
      nextAt: NOW + ELEVATED_INTERVAL_MS,
      notified: false,
    });
    expect(mocks.insertValues).toHaveBeenCalledTimes(0);
  });

  it('pushes a new alert to the watchers', async () => {
    mocks.fetchLocationAlerts.mockResolvedValue([alert('Flood Warning')]);
    const result = await run();
    expect(result).toEqual({
      seenIds: [FLOOD_ID],
      nextAt: NOW + ELEVATED_INTERVAL_MS,
      notified: true,
    });
  });

  it('stops when nobody watches the place any more', async () => {
    mocks.fetchLocationAlerts.mockResolvedValue([alert('Flood Warning')]);
    mocks.notifyWatchers.mockResolvedValue({ watchers: 0 });
    const result = await run();
    expect(result).toEqual({ seenIds: [FLOOD_ID], nextAt: null, notified: false });
  });
});

describe('deliverWatchedPlaceAlerts', () => {
  const now = new Date(NOW);

  it('records the alert and pushes it to the watchers', async () => {
    const result = await deliverWatchedPlaceAlerts({
      env,
      weatherLocationId: 42,
      alerts: [alert('Flood Warning')],
      now,
    });
    expect(result).toEqual({ gone: false, notified: true });
    expect(mocks.insertValues).toHaveBeenCalledWith({
      weatherLocationId: 42,
      lastAlertHash: FLOOD_ID,
      lastAlertIds: [FLOOD_ID],
      pollTier: 'elevated',
      activeSince: now,
      lastPolledAt: now,
      updatedAt: now,
    });
    expect(mocks.notifyWatchers).toHaveBeenCalledWith({
      env,
      weatherLocationId: 42,
      newAlerts: [alert('Flood Warning')],
    });
  });

  it('keeps the original activeSince of a place already under an alert', async () => {
    const since = new Date(NOW - 60 * 60 * 1000);
    mocks.stateRows = [{ lastAlertIds: ['Wind Advisory|x'], activeSince: since }];
    await deliverWatchedPlaceAlerts({
      env,
      weatherLocationId: 42,
      alerts: [alert('Flood Warning')],
      now,
    });
    expect(mocks.insertValues).toHaveBeenCalledWith(
      expect.objectContaining({ activeSince: since }),
    );
  });

  it('does not push an alert Postgres says was already sent', async () => {
    mocks.stateRows = [{ lastAlertIds: [FLOOD_ID], activeSince: now }];
    const result = await deliverWatchedPlaceAlerts({
      env,
      weatherLocationId: 42,
      alerts: [alert('Flood Warning')],
      now,
    });
    expect(result).toEqual({ gone: false, notified: false });
    expect(mocks.notifyWatchers).toHaveBeenCalledTimes(0);
  });

  it('reports the place as gone when it has no watchers', async () => {
    mocks.notifyWatchers.mockResolvedValue({ watchers: 0 });
    const result = await deliverWatchedPlaceAlerts({
      env,
      weatherLocationId: 42,
      alerts: [alert('Flood Warning')],
      now,
    });
    expect(result).toEqual({ gone: true, notified: false });
  });
});
