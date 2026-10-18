import { createDb } from '@packrat/api/db';
import { getEnv } from '@packrat/api/utils/env-validation';
import { captureApiException } from '@packrat/api/utils/sentry';
import {
  APP_CONFIG,
  type ClientPlatformValue,
  FeatureFlag,
  isClientPlatform,
  resolveFlagsForPlatform,
} from '@packrat/config';
import { featureFlagPlatformOverrides, featureFlags } from '@packrat/db/schema';
import { and, eq } from 'drizzle-orm';

// All flag keys known to the codebase. Exported so the admin route can build
// a zod enum from it — that's the actual validation boundary for write paths.
export const KNOWN_FEATURE_FLAG_KEYS = Object.freeze(Object.values(FeatureFlag));

// Default lookup by a plain `string` key (e.g. from a DB row) rather than the
// narrow FeatureFlag literal union.
function getDefaultFlagValue(key: string): boolean {
  const defaults: Record<string, boolean> = APP_CONFIG.featureFlags;
  return defaults[key] ?? false;
}

export interface AdminFeatureFlagItem {
  key: string;
  defaultValue: boolean;
  override: boolean | null;
  effective: boolean;
  description: string | null;
  updatedAt: Date | null;
  /**
   * Per-platform overrides, keyed by platform. A platform absent from this map
   * inherits `effective`; a platform present in it overrides that value for
   * that platform only.
   */
  platformOverrides: Partial<Record<ClientPlatformValue, PlatformOverrideItem>>;
}

export interface PlatformOverrideItem {
  enabled: boolean;
  reason: string | null;
  updatedAt: Date;
}

/**
 * Effective value for every known flag, optionally targeted at one platform.
 *
 * Resolution is three layers, most specific first: a platform override, the
 * global override, then the coded default. Powers the public, unauthenticated
 * route the clients fetch to resolve gating.
 *
 * `platform` comes from an untrusted query parameter. An unrecognised value is
 * ignored rather than rejected, and the caller gets globally-resolved flags —
 * an old client or a surface with no targeting (Expo on web) must not have
 * every flag dark-launched just because the server did not recognise it.
 */
export async function listEffectiveFeatureFlags(
  platform?: string,
): Promise<Record<string, boolean>> {
  const db = createDb();
  const defaults: Record<string, boolean> = { ...APP_CONFIG.featureFlags };

  try {
    const globalRows = await db.tag('featureFlags.listEffective').query.featureFlags.findMany({
      columns: { key: true, enabled: true },
    });
    const globalOverrides: Record<string, boolean> = {};
    for (const row of globalRows) globalOverrides[row.key] = row.enabled;

    // Only query platform rows when the caller named a platform we target.
    const platformOverrides: Record<string, boolean> = {};
    if (isClientPlatform(platform)) {
      const platformRows = await db
        .tag('featureFlags.listPlatformOverrides')
        .query.featureFlagPlatformOverrides.findMany({
          columns: { key: true, enabled: true },
          where: eq(featureFlagPlatformOverrides.platform, platform),
        });
      for (const row of platformRows) platformOverrides[row.key] = row.enabled;
    }

    return resolveFlagsForPlatform({ platformOverrides, globalOverrides, defaults });
  } catch (error) {
    captureApiException({
      error,
      operation: 'featureFlags.listEffective',
      tags: { feature: 'featureFlags' },
      extra: { platform },
    });
    throw error;
  }
}

/**
 * KV mirror of the global overrides, for the cron. Neon suspends after 5 idle
 * minutes, so a cron that reads flags from Postgres every 15 keeps it billing
 * around the clock; KV reads don't wake it.
 *
 * Stores overrides rather than resolved values so a deploy that changes a
 * coded default takes effect at once. Every admin write drops the key; the
 * TTL bounds staleness if a drop is ever lost.
 */
export const GLOBAL_FLAG_OVERRIDES_KEY = 'feature-flags:global-overrides';
const GLOBAL_FLAG_OVERRIDES_TTL_SECONDS = 24 * 60 * 60;

/** The slice of `KVNamespace` the mirror uses; any KV binding satisfies it. */
export type FlagsKv = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
};

async function readGlobalOverrides(): Promise<Record<string, boolean>> {
  const rows = await createDb()
    .tag('featureFlags.listGlobalOverrides')
    .query.featureFlags.findMany({ columns: { key: true, enabled: true } });
  const overrides: Record<string, boolean> = {};
  for (const row of rows) overrides[row.key] = row.enabled;
  return overrides;
}

/** Globally-resolved flags from the KV mirror; reads Postgres only to refill it. */
export async function listCachedFeatureFlags(kv: FlagsKv): Promise<Record<string, boolean>> {
  const cached = await kv.get(GLOBAL_FLAG_OVERRIDES_KEY);
  let globalOverrides: Record<string, boolean>;
  if (cached !== null) {
    globalOverrides = JSON.parse(cached) as Record<string, boolean>; // safe-cast: written only by this module
  } else {
    globalOverrides = await readGlobalOverrides();
    await kv.put(GLOBAL_FLAG_OVERRIDES_KEY, JSON.stringify(globalOverrides), {
      expirationTtl: GLOBAL_FLAG_OVERRIDES_TTL_SECONDS,
    });
  }
  return resolveFlagsForPlatform({
    platformOverrides: {},
    globalOverrides,
    defaults: { ...APP_CONFIG.featureFlags },
  });
}

async function invalidateCachedFeatureFlags(): Promise<void> {
  try {
    await getEnv().AUTH_KV.delete(GLOBAL_FLAG_OVERRIDES_KEY);
  } catch (error) {
    captureApiException({
      error,
      operation: 'featureFlags.invalidateCache',
      tags: { feature: 'featureFlags' },
    });
  }
}

/** Every known flag, with its coded default, any override, and the effective value. Admin-only. */
export async function listFeatureFlagsForAdmin(): Promise<AdminFeatureFlagItem[]> {
  const db = createDb();
  try {
    const overrides = await db.tag('featureFlags.listAdmin').query.featureFlags.findMany({
      columns: { key: true, enabled: true, description: true, updatedAt: true },
    });
    const overrideByKey = new Map(overrides.map((row) => [row.key, row]));

    const platformRows = await db
      .tag('featureFlags.listAdminPlatformOverrides')
      .query.featureFlagPlatformOverrides.findMany({
        columns: { key: true, platform: true, enabled: true, reason: true, updatedAt: true },
      });
    const platformByKey = new Map<string, AdminFeatureFlagItem['platformOverrides']>();
    for (const row of platformRows) {
      const forKey = platformByKey.get(row.key) ?? {};
      forKey[row.platform] = {
        enabled: row.enabled,
        reason: row.reason,
        updatedAt: row.updatedAt,
      };
      platformByKey.set(row.key, forKey);
    }

    return KNOWN_FEATURE_FLAG_KEYS.map((key) => {
      const defaultValue = getDefaultFlagValue(key);
      const override = overrideByKey.get(key);
      return {
        key,
        defaultValue,
        override: override ? override.enabled : null,
        effective: override ? override.enabled : defaultValue,
        description: override?.description ?? null,
        updatedAt: override?.updatedAt ?? null,
        platformOverrides: platformByKey.get(key) ?? {},
      };
    });
  } catch (error) {
    captureApiException({
      error,
      operation: 'featureFlags.listAdmin',
      tags: { feature: 'featureFlags' },
    });
    throw error;
  }
}

export async function upsertFeatureFlagOverride({
  key,
  enabled,
  description,
}: {
  key: string;
  enabled: boolean;
  description?: string | null;
}): Promise<AdminFeatureFlagItem> {
  const db = createDb();
  try {
    const [row] = await db
      .tag('featureFlags.upsert')
      .insert(featureFlags)
      .values({ key, enabled, description: description ?? null, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: featureFlags.key,
        set: { enabled, description: description ?? null, updatedAt: new Date() },
      })
      // Drizzle 0.45.x narrows the insert query type after `.onConflictDoUpdate()`
      // so the field-projected `.returning()` overload isn't visible — only the
      // no-arg version compiles (see the identical note in catalogService.ts).
      // featureFlags isn't a fat table so shipping the full (small) row is fine.
      .returning();
    if (!row) throw new Error('Failed to upsert feature flag override');
    await invalidateCachedFeatureFlags();
    return {
      key: row.key,
      defaultValue: getDefaultFlagValue(row.key),
      override: row.enabled,
      effective: row.enabled,
      description: row.description,
      updatedAt: row.updatedAt,
      // Unchanged by a global write; the caller refetches the list to see them.
      platformOverrides: {},
    };
  } catch (error) {
    captureApiException({
      error,
      operation: 'featureFlags.upsert',
      tags: { feature: 'featureFlags' },
      extra: { key },
    });
    throw error;
  }
}

/** Removes the override, reverting the key to its coded default. Returns false if none existed. */
export async function deleteFeatureFlagOverride(key: string): Promise<boolean> {
  const db = createDb();
  try {
    const deleted = await db
      .tag('featureFlags.delete')
      .delete(featureFlags)
      .where(eq(featureFlags.key, key))
      .returning();
    if (deleted.length > 0) await invalidateCachedFeatureFlags();
    return deleted.length > 0;
  } catch (error) {
    captureApiException({
      error,
      operation: 'featureFlags.delete',
      tags: { feature: 'featureFlags' },
      extra: { key },
    });
    throw error;
  }
}

/**
 * Sets a platform override, or clears it so the platform inherits the global
 * value again.
 *
 * Clearing is a delete rather than a stored "inherit" value: an absent row is
 * already how inheritance is expressed everywhere else in this system, and a
 * third state would mean two ways to say the same thing.
 */
export async function setFeatureFlagPlatformOverride({
  key,
  platform,
  enabled,
  reason,
}: {
  key: string;
  platform: ClientPlatformValue;
  /** `null` clears the override, restoring inheritance from the global value. */
  enabled: boolean | null;
  reason?: string | null;
}): Promise<void> {
  const db = createDb();
  try {
    if (enabled === null) {
      await db
        .tag('featureFlags.clearPlatformOverride')
        .delete(featureFlagPlatformOverrides)
        .where(
          and(
            eq(featureFlagPlatformOverrides.key, key),
            eq(featureFlagPlatformOverrides.platform, platform),
          ),
        );
      return;
    }

    // The platform table references feature_flags, so the global row has to
    // exist first. Seed it at its coded default rather than failing: someone
    // targeting one platform has not said anything about the others.
    await db
      .tag('featureFlags.ensureGlobalRow')
      .insert(featureFlags)
      .values({ key, enabled: getDefaultFlagValue(key), updatedAt: new Date() })
      .onConflictDoNothing({ target: featureFlags.key });

    await db
      .tag('featureFlags.setPlatformOverride')
      .insert(featureFlagPlatformOverrides)
      .values({ key, platform, enabled, reason: reason ?? null, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: [featureFlagPlatformOverrides.key, featureFlagPlatformOverrides.platform],
        set: { enabled, reason: reason ?? null, updatedAt: new Date() },
      });
  } catch (error) {
    captureApiException({
      error,
      operation: 'featureFlags.setPlatformOverride',
      tags: { feature: 'featureFlags' },
      extra: { key, platform, enabled },
    });
    throw error;
  }
}
