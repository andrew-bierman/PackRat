import { createDbClient } from '@packrat/api/db';
import type { ValidatedEnv } from '@packrat/api/utils/env-validation';
import { weatherLocationAlertState } from '@packrat/db/schema';
import type { WeatherAlertItem } from '@packrat/schemas/weather';
import { eq } from 'drizzle-orm';
import { notifyWatchers } from '../push/notifyWatchers';
import { diffAlerts } from './diffAlerts';
import { fetchLocationAlerts } from './fetchLocationAlerts';

/** A clear place is checked every 30 minutes; one with an active alert, every 15. */
export const BASELINE_INTERVAL_MS = 30 * 60 * 1000;
export const ELEVATED_INTERVAL_MS = 15 * 60 * 1000;

/**
 * Pushes alerts a place's timer saw for the first time to everyone watching
 * it. Postgres is the record of what was already pushed, so a timer that lost
 * its storage can't push the same alert twice. Returns `gone` when nobody
 * watches the place any more, so the timer can stop.
 */
export async function deliverWatchedPlaceAlerts({
  env,
  weatherLocationId,
  alerts,
  now,
}: {
  env: ValidatedEnv;
  weatherLocationId: number;
  alerts: WeatherAlertItem[];
  now: Date;
}): Promise<{ gone: boolean; notified: boolean }> {
  const db = createDbClient(env);
  const [state] = await db
    .tag('weatherMonitoring.getAlertState')
    .select({
      lastAlertIds: weatherLocationAlertState.lastAlertIds,
      activeSince: weatherLocationAlertState.activeSince,
    })
    .from(weatherLocationAlertState)
    .where(eq(weatherLocationAlertState.weatherLocationId, weatherLocationId));

  const diff = diffAlerts({ previousIds: state?.lastAlertIds ?? [], currentAlerts: alerts });
  const values = {
    lastAlertHash: diff.hash,
    lastAlertIds: diff.currentIds,
    pollTier: 'elevated' as const,
    activeSince: state?.activeSince ?? now,
    lastPolledAt: now,
    updatedAt: now,
  };
  await db
    .tag('weatherMonitoring.upsertAlertState')
    .insert(weatherLocationAlertState)
    .values({ weatherLocationId, ...values })
    .onConflictDoUpdate({ target: weatherLocationAlertState.weatherLocationId, set: values });

  if (diff.newAlerts.length === 0) return { gone: false, notified: false };
  const { watchers } = await notifyWatchers({ env, weatherLocationId, newAlerts: diff.newAlerts });
  return { gone: watchers === 0, notified: watchers > 0 };
}

export type PlaceTickResult = {
  /** Alert ids active at the place, for the next tick's comparison. */
  seenIds: string[];
  /** When to run next; null once nobody watches the place. */
  nextAt: number | null;
  notified: boolean;
};

/**
 * One run of a watched place's timer. It checks the place's alerts on
 * WeatherAPI and reaches Postgres only when an alert it hasn't seen appears.
 * With the feature off it keeps time without checking, so turning the flag on
 * needs no re-arm.
 */
export async function tickWatchedPlace({
  env,
  weatherLocationId,
  seenIds,
  enabled,
  now,
}: {
  env: ValidatedEnv;
  weatherLocationId: number;
  seenIds: string[];
  enabled: boolean;
  now: number;
}): Promise<PlaceTickResult> {
  if (!enabled) return { seenIds, nextAt: now + BASELINE_INTERVAL_MS, notified: false };

  const alerts = await fetchLocationAlerts(weatherLocationId);
  const diff = diffAlerts({ previousIds: seenIds, currentAlerts: alerts });
  const nextAt = now + (diff.currentIds.length > 0 ? ELEVATED_INTERVAL_MS : BASELINE_INTERVAL_MS);
  if (diff.newAlerts.length === 0) return { seenIds: diff.currentIds, nextAt, notified: false };

  const delivery = await deliverWatchedPlaceAlerts({
    env,
    weatherLocationId,
    alerts,
    now: new Date(now),
  });
  return {
    seenIds: diff.currentIds,
    nextAt: delivery.gone ? null : nextAt,
    notified: delivery.notified,
  };
}
