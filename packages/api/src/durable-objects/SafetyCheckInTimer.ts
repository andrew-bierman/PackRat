import { DurableObject } from 'cloudflare:workers';
import { sweepSafetyCheckIns } from '@packrat/api/services/safetyCheckIn/sweep';
import { type Env, getEnv, setWorkerEnv } from '@packrat/api/utils/env-validation';
import { record } from '@packrat/api/utils/sentry';

const CHECK_IN_ID_KEY = 'checkInId';

/**
 * One instance per safety check-in (`idFromName(checkInId)`). Holds a single
 * alarm set for the moment the check-in goes overdue, so the overdue alert is
 * sent on time without a cron polling Postgres every few minutes — Neon only
 * wakes when a check-in actually comes due.
 *
 * Postgres stays the source of truth: the alarm runs the same claim-then-send
 * path the sweep used, so a check-in that was ended or already alerted is a
 * no-op, and a failed run is retried by the runtime.
 */
export class SafetyCheckInTimer extends DurableObject<Env> {
  /** Sets (or moves) the alarm. A time in the past fires immediately. */
  async arm(checkInId: string, at: number): Promise<void> {
    await this.ctx.storage.put(CHECK_IN_ID_KEY, checkInId);
    await this.ctx.storage.setAlarm(at);
  }

  async disarm(): Promise<void> {
    await this.ctx.storage.deleteAlarm();
    await this.ctx.storage.deleteAll();
  }

  override async alarm(): Promise<void> {
    const checkInId = await this.ctx.storage.get<string>(CHECK_IN_ID_KEY);
    if (!checkInId) return;

    setWorkerEnv(this.env as unknown as Record<string, unknown>); // safe-cast: same as the Worker's fetch handler
    const result = await record({
      operation: 'safetyCheckIn.overdueAlarm',
      tags: { trigger: 'alarm' },
      extra: { checkInId },
      fn: async () => sweepSafetyCheckIns({ env: getEnv(), checkInId }),
    });
    console.log(`[safetyCheckIn] overdue alarm: checkInId=${checkInId} alerted=${result.alerted}`);
    await this.ctx.storage.deleteAll();
  }
}
