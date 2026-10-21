import { createDbClient } from '@packrat/api/db';
import { getEnv, type ValidatedEnv } from '@packrat/api/utils/env-validation';
import { captureApiException } from '@packrat/api/utils/sentry';
import { weatherWatchedLocations } from '@packrat/db/schema';

function timerFor({
  weatherLocationId,
  env = getEnv(),
}: {
  weatherLocationId: number;
  env?: ValidatedEnv;
}) {
  const namespace = env.WATCHED_PLACE_WATCHER;
  if (!namespace) return null;
  return namespace.get(namespace.idFromName(String(weatherLocationId)));
}

/**
 * Starts the place's timer if it isn't running. Best effort: the watch-list
 * write has already landed, and the daily re-arm repairs a timer that missed it.
 */
export async function armWatchedPlaceTimer({
  weatherLocationId,
}: {
  weatherLocationId: number;
}): Promise<void> {
  try {
    await timerFor({ weatherLocationId })?.arm({ weatherLocationId });
  } catch (error) {
    captureApiException({
      error,
      operation: 'weatherMonitoring.armPlaceTimer',
      tags: { feature: 'weatherMonitoring' },
      extra: { weatherLocationId },
    });
  }
}

/** Stops the timer of a place nobody watches. A stray alarm would stop itself anyway. */
export async function disarmWatchedPlaceTimer({
  weatherLocationId,
}: {
  weatherLocationId: number;
}): Promise<void> {
  try {
    await timerFor({ weatherLocationId })?.disarm();
  } catch (error) {
    captureApiException({
      error,
      operation: 'weatherMonitoring.disarmPlaceTimer',
      tags: { feature: 'weatherMonitoring' },
      extra: { weatherLocationId },
    });
  }
}

/**
 * Daily backstop: starts the timer of every watched place. Arming leaves a
 * running timer alone, so this only starts timers that are missing — places
 * watched before the timers existed, or a failed arm.
 */
export async function rearmWatchedPlaceTimers({ env }: { env: ValidatedEnv }): Promise<{
  armed: number;
}> {
  const db = createDbClient(env);
  const places = await db
    .tag('weatherMonitoring.listDistinctWatchedLocations')
    .selectDistinct({ weatherLocationId: weatherWatchedLocations.weatherLocationId })
    .from(weatherWatchedLocations);

  let armed = 0;
  for (const { weatherLocationId } of places) {
    const timer = timerFor({ weatherLocationId, env });
    if (!timer) break;
    await timer.arm({ weatherLocationId });
    armed++;
  }
  return { armed };
}
