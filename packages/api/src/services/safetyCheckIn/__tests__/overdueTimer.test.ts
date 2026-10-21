import type { ValidatedEnv } from '@packrat/api/utils/env-validation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  env: {} as { SAFETY_CHECK_IN_TIMER?: unknown },
  pending: [] as unknown[],
  captureApiException: vi.fn(),
  arm: vi.fn(),
  disarm: vi.fn(),
}));

vi.mock('@packrat/api/utils/env-validation', () => ({ getEnv: () => mocks.env }));
vi.mock('@packrat/api/utils/sentry', () => ({ captureApiException: mocks.captureApiException }));
vi.mock('@packrat/api/db', () => ({
  createDbClient: () => ({
    tag: () => ({ select: () => ({ from: () => ({ where: async () => mocks.pending }) }) }),
  }),
}));

const { armOverdueTimer, disarmOverdueTimer, rearmOverdueTimers } = await import('../overdueTimer');

/** A fake namespace whose every timer shares the `arm`/`disarm` spies. */
function fakeNamespace() {
  const namespace = {
    idFromName: vi.fn((name: string) => `id:${name}`),
    get: vi.fn(() => ({ arm: mocks.arm, disarm: mocks.disarm })),
  };
  mocks.env = { SAFETY_CHECK_IN_TIMER: namespace };
  return namespace;
}

const AT = new Date('2026-09-14T04:00:00.000Z');

beforeEach(() => {
  vi.clearAllMocks();
  mocks.env = {};
  mocks.pending = [];
});

describe('armOverdueTimer', () => {
  it("sets the alarm on that check-in's own timer", async () => {
    const namespace = fakeNamespace();
    await armOverdueTimer({ checkInId: 'ci-1', at: AT });
    expect(namespace.idFromName).toHaveBeenCalledWith('ci-1');
    expect(mocks.arm).toHaveBeenCalledWith({ checkInId: 'ci-1', at: AT.getTime() });
  });

  it('does nothing without the binding', async () => {
    await armOverdueTimer({ checkInId: 'ci-1', at: AT });
    expect(mocks.arm).not.toHaveBeenCalled();
  });

  it('captures a failure instead of failing the write that triggered it', async () => {
    fakeNamespace();
    mocks.arm.mockRejectedValueOnce(new Error('do down'));
    await expect(armOverdueTimer({ checkInId: 'ci-1', at: AT })).resolves.toBeUndefined();
    expect(mocks.captureApiException).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: 'safetyCheckIn.armOverdueTimer',
        extra: { checkInId: 'ci-1' },
      }),
    );
  });
});

describe('disarmOverdueTimer', () => {
  it("clears that check-in's timer", async () => {
    const namespace = fakeNamespace();
    await disarmOverdueTimer({ checkInId: 'ci-1' });
    expect(namespace.idFromName).toHaveBeenCalledWith('ci-1');
    expect(mocks.disarm).toHaveBeenCalledTimes(1);
  });

  it('does nothing without the binding', async () => {
    await disarmOverdueTimer({ checkInId: 'ci-1' });
    expect(mocks.disarm).not.toHaveBeenCalled();
  });

  it('captures a failure', async () => {
    fakeNamespace();
    mocks.disarm.mockRejectedValueOnce(new Error('do down'));
    await expect(disarmOverdueTimer({ checkInId: 'ci-1' })).resolves.toBeUndefined();
    expect(mocks.captureApiException).toHaveBeenCalledWith(
      expect.objectContaining({ operation: 'safetyCheckIn.disarmOverdueTimer' }),
    );
  });
});

describe('rearmOverdueTimers', () => {
  it('arms every check-in still waiting on its alert at return plus grace', async () => {
    fakeNamespace();
    mocks.pending = [
      { id: 'ci-1', expectedReturnAt: new Date('2026-09-14T02:00:00.000Z'), graceMinutes: 120 },
      { id: 'ci-2', expectedReturnAt: new Date('2026-09-15T10:00:00.000Z'), graceMinutes: 30 },
    ];

    expect(await rearmOverdueTimers({ env: mocks.env as ValidatedEnv })).toEqual({ armed: 2 });
    expect(mocks.arm.mock.calls).toEqual([
      [{ checkInId: 'ci-1', at: AT.getTime() }],
      [{ checkInId: 'ci-2', at: new Date('2026-09-15T10:30:00.000Z').getTime() }],
    ]);
  });

  it('arms nothing without the binding', async () => {
    mocks.pending = [
      { id: 'ci-1', expectedReturnAt: new Date('2026-09-14T02:00:00.000Z'), graceMinutes: 120 },
    ];
    expect(await rearmOverdueTimers({ env: mocks.env as ValidatedEnv })).toEqual({ armed: 0 });
  });
});
