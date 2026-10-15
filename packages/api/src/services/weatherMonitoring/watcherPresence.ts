/**
 * A KV marker that says "at least one location is watched", so the polling
 * cron can skip Postgres entirely when nobody is watching anything.
 *
 * Why KV and not a row count: Neon suspends compute after 5 idle minutes, so
 * any cron that touches Postgres more often than that — even a one-row flag
 * lookup — keeps the database awake (and billing) around the clock. KV reads
 * don't wake Neon.
 *
 * Set on add and re-asserted when a non-empty watch list is read (self-heals a
 * marker lost to a race); cleared only by the poller when it finds no watched
 * locations.
 */
export const HAS_WATCHERS_KEY = 'weather-monitoring:has-watchers';

/** The slice of `KVNamespace` the marker uses; any KV binding satisfies it. */
export type MarkerKv = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
};

export async function hasWatchers(kv: MarkerKv): Promise<boolean> {
  return (await kv.get(HAS_WATCHERS_KEY)) !== null;
}

export async function markHasWatchers(kv: MarkerKv): Promise<void> {
  if (await hasWatchers(kv)) return;
  await kv.put(HAS_WATCHERS_KEY, '1');
}

export async function clearHasWatchers(kv: MarkerKv): Promise<void> {
  await kv.delete(HAS_WATCHERS_KEY);
}
