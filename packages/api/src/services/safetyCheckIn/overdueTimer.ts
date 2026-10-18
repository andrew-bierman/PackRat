import { createDbClient } from '@packrat/api/db';
import { getEnv, type ValidatedEnv } from '@packrat/api/utils/env-validation';
import { captureApiException } from '@packrat/api/utils/sentry';
import { safetyCheckIns } from '@packrat/db/schema';
import { and, eq, isNull } from 'drizzle-orm';

function timerFor(checkInId: string, env: ValidatedEnv = getEnv()) {
  const namespace = env.SAFETY_CHECK_IN_TIMER;
  if (!namespace) return null;
  return namespace.get(namespace.idFromName(checkInId));
}

/**
 * Sets the check-in's overdue alarm, or moves it after an extend. Best effort:
 * the write that triggered it has already landed, and the daily re-arm picks up
 * any check-in whose alarm failed to set.
 */
export async function armOverdueTimer({
  checkInId,
  at,
}: {
  checkInId: string;
  at: Date;
}): Promise<void> {
  try {
    await timerFor(checkInId)?.arm(checkInId, at.getTime());
  } catch (error) {
    captureApiException({
      error,
      operation: 'safetyCheckIn.armOverdueTimer',
      tags: { feature: 'safetyCheckIn' },
      extra: { checkInId },
    });
  }
}

/** Clears the alarm once a check-in ends. A stray alarm would be a no-op anyway. */
export async function disarmOverdueTimer({ checkInId }: { checkInId: string }): Promise<void> {
  try {
    await timerFor(checkInId)?.disarm();
  } catch (error) {
    captureApiException({
      error,
      operation: 'safetyCheckIn.disarmOverdueTimer',
      tags: { feature: 'safetyCheckIn' },
      extra: { checkInId },
    });
  }
}

/**
 * Daily backstop: re-sets the alarm of every active check-in still waiting on
 * its overdue alert. Arming is idempotent and a past time fires at once, so
 * this also catches check-ins started before the alarms existed.
 */
export async function rearmOverdueTimers({ env }: { env: ValidatedEnv }): Promise<{
  armed: number;
}> {
  const db = createDbClient(env);
  const pending = await db
    .tag('safetyCheckIn.listAwaitingOverdue')
    .select({
      id: safetyCheckIns.id,
      expectedReturnAt: safetyCheckIns.expectedReturnAt,
      graceMinutes: safetyCheckIns.graceMinutes,
    })
    .from(safetyCheckIns)
    .where(and(eq(safetyCheckIns.status, 'active'), isNull(safetyCheckIns.overdueAlertSentAt)));

  let armed = 0;
  for (const checkIn of pending) {
    const timer = timerFor(checkIn.id, env);
    if (!timer) break;
    await timer.arm(checkIn.id, checkIn.expectedReturnAt.getTime() + checkIn.graceMinutes * 60_000);
    armed++;
  }
  return { armed };
}
