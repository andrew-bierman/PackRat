import type { ValidatedEnv } from '@packrat/api/utils/env-validation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  env: {} as { WATCHED_PLACE_WATCHER?: unknown },
  places: [] as { weatherLocationId: number }[],
  captureApiException: vi.fn(),
  arm: vi.fn(),
  disarm: vi.fn(),
}));

vi.mock('@packrat/api/utils/env-validation', () => ({ getEnv: () => mocks.env }));
vi.mock('@packrat/api/utils/sentry', () => ({ captureApiException: mocks.captureApiException }));
vi.mock('@packrat/api/db', () => ({
  createDbClient: () => ({
    tag: () => ({ selectDistinct: () => ({ from: async () => mocks.places }) }),
  }),
}));

const { armWatchedPlaceTimer, disarmWatchedPlaceTimer, rearmWatchedPlaceTimers } = await import(
  '../watchedPlaceTimer'
);

/** A fake namespace whose every timer shares the `arm`/`disarm` spies. */
function fakeNamespace() {
  const namespace = {
    idFromName: vi.fn((name: string) => `id:${name}`),
    get: vi.fn(() => ({ arm: mocks.arm, disarm: mocks.disarm })),
  };
  mocks.env = { WATCHED_PLACE_WATCHER: namespace };
  return namespace;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.env = {};
  mocks.places = [];
});

describe('armWatchedPlaceTimer', () => {
  it("starts that place's own timer", async () => {
    const namespace = fakeNamespace();
    await armWatchedPlaceTimer({ weatherLocationId: 42 });
    expect(namespace.idFromName).toHaveBeenCalledWith('42');
    expect(mocks.arm).toHaveBeenCalledWith({ weatherLocationId: 42 });
  });

  it('does nothing without the binding', async () => {
    await armWatchedPlaceTimer({ weatherLocationId: 42 });
    expect(mocks.arm).toHaveBeenCalledTimes(0);
  });

  it('captures a failure instead of failing the watch-list write', async () => {
    fakeNamespace();
    mocks.arm.mockRejectedValueOnce(new Error('do down'));
    await expect(armWatchedPlaceTimer({ weatherLocationId: 42 })).resolves.toBeUndefined();
    expect(mocks.captureApiException).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: 'weatherMonitoring.armPlaceTimer',
        extra: { weatherLocationId: 42 },
      }),
    );
  });
});

describe('disarmWatchedPlaceTimer', () => {
  it("stops that place's timer", async () => {
    const namespace = fakeNamespace();
    await disarmWatchedPlaceTimer({ weatherLocationId: 42 });
    expect(namespace.idFromName).toHaveBeenCalledWith('42');
    expect(mocks.disarm).toHaveBeenCalledTimes(1);
  });

  it('does nothing without the binding', async () => {
    await disarmWatchedPlaceTimer({ weatherLocationId: 42 });
    expect(mocks.disarm).toHaveBeenCalledTimes(0);
  });

  it('captures a failure instead of failing the removal', async () => {
    fakeNamespace();
    mocks.disarm.mockRejectedValueOnce(new Error('do down'));
    await expect(disarmWatchedPlaceTimer({ weatherLocationId: 42 })).resolves.toBeUndefined();
    expect(mocks.captureApiException).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: 'weatherMonitoring.disarmPlaceTimer',
        extra: { weatherLocationId: 42 },
      }),
    );
  });
});

describe('rearmWatchedPlaceTimers', () => {
  it('starts the timer of every watched place', async () => {
    fakeNamespace();
    mocks.places = [{ weatherLocationId: 42 }, { weatherLocationId: 7 }];
    const result = await rearmWatchedPlaceTimers({ env: mocks.env as ValidatedEnv });
    expect(result).toEqual({ armed: 2 });
    expect(mocks.arm).toHaveBeenCalledWith({ weatherLocationId: 7 });
  });

  it('arms nothing without the binding', async () => {
    mocks.places = [{ weatherLocationId: 42 }];
    const result = await rearmWatchedPlaceTimers({ env: {} as ValidatedEnv });
    expect(result).toEqual({ armed: 0 });
    expect(mocks.arm).toHaveBeenCalledTimes(0);
  });
});
