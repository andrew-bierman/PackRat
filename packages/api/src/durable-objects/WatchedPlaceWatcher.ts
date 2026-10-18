import { DurableObject } from 'cloudflare:workers';
import { listCachedFeatureFlags } from '@packrat/api/services/featureFlagsService';
import { tickWatchedPlace } from '@packrat/api/services/weatherMonitoring/watchedPlaceWatch';
import { type Env, getEnv, setWorkerEnv } from '@packrat/api/utils/env-validation';
import { record } from '@packrat/api/utils/sentry';
import { FeatureFlag } from '@packrat/config';

const PLACE_KEY = 'weatherLocationId';
const SEEN_IDS_KEY = 'seenIds';

/**
 * One instance per watched WeatherAPI location (`idFromName(String(id))`),
 * shared by everyone watching it. Checks the place for weather alerts every
 * 30 minutes, or every 15 while an alert is active. A check never wakes
 * Postgres — Neon is reached only to push a new alert to the place's watchers.
 *
 * Postgres stays the source of truth: the watch list decides which timers run
 * (armed on add, stopped when the last watcher leaves, re-armed daily), and
 * what was pushed is recorded there.
 */
export class WatchedPlaceWatcher extends DurableObject<Env> {
  /** Starts the timer. A timer already running keeps its schedule. */
  async arm({ weatherLocationId }: { weatherLocationId: number }): Promise<void> {
    await this.ctx.storage.put(PLACE_KEY, weatherLocationId);
    if ((await this.ctx.storage.getAlarm()) === null) await this.ctx.storage.setAlarm(Date.now());
  }

  async disarm(): Promise<void> {
    await this.ctx.storage.deleteAlarm();
    await this.ctx.storage.deleteAll();
  }

  override async alarm(): Promise<void> {
    const weatherLocationId = await this.ctx.storage.get<number>(PLACE_KEY);
    if (weatherLocationId === undefined) return;
    const seenIds = (await this.ctx.storage.get<string[]>(SEEN_IDS_KEY)) ?? [];

    setWorkerEnv(this.env as unknown as Record<string, unknown>); // safe-cast: same as the Worker's fetch handler
    const env = getEnv();
    const flags = await listCachedFeatureFlags(env.AUTH_KV);
    const result = await record({
      operation: 'weatherMonitoring.placeAlarm',
      tags: { trigger: 'alarm' },
      extra: { weatherLocationId },
      fn: async () =>
        tickWatchedPlace({
          env,
          weatherLocationId,
          seenIds,
          enabled: flags[FeatureFlag.EnableWeatherMonitoring] === true,
          now: Date.now(),
        }),
    });

    if (result.nextAt === null) {
      await this.ctx.storage.deleteAll();
      return;
    }
    await this.ctx.storage.put(SEEN_IDS_KEY, result.seenIds);
    await this.ctx.storage.setAlarm(result.nextAt);
  }
}
