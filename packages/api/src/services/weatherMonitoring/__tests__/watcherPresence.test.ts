import { describe, expect, it, vi } from 'vitest';
import {
  clearHasWatchers,
  HAS_WATCHERS_KEY,
  hasWatchers,
  type MarkerKv,
  markHasWatchers,
} from '../watcherPresence';

function fakeKv(initial: string | null = null) {
  let value = initial;
  const kv = {
    get: vi.fn(async (_key: string): Promise<string | null> => value),
    put: vi.fn(async (_key: string, v: string) => {
      value = v;
    }),
    delete: vi.fn(async (_key: string) => {
      value = null;
    }),
  };
  const store: MarkerKv = kv;
  return { kv, store };
}

describe('watcherPresence', () => {
  it('reports no watchers when the marker is absent', async () => {
    const { store } = fakeKv();
    expect(await hasWatchers(store)).toBe(false);
  });

  it('reports watchers once marked', async () => {
    const { kv, store } = fakeKv();
    await markHasWatchers(store);
    expect(kv.put).toHaveBeenCalledWith(HAS_WATCHERS_KEY, '1');
    expect(await hasWatchers(store)).toBe(true);
  });

  it('skips the KV write when already marked, to stay inside the per-key write limit', async () => {
    const { kv, store } = fakeKv('1');
    await markHasWatchers(store);
    expect(kv.put).toHaveBeenCalledTimes(0);
  });

  it('reports no watchers after clearing', async () => {
    const { kv, store } = fakeKv('1');
    await clearHasWatchers(store);
    expect(kv.delete).toHaveBeenCalledWith(HAS_WATCHERS_KEY);
    expect(await hasWatchers(store)).toBe(false);
  });
});
