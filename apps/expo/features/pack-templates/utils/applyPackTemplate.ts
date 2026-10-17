import { PACK_CATEGORIES, type PackCategory } from '@packrat/constants';
import type { PackInStore } from 'expo-app/features/packs/types';

// Applying a template copies its items into a pack on the server in one
// request. The pack has to exist there first, so a new pack is created online
// before it touches the local store — offline, the user keeps the name they
// typed instead of ending up with an empty pack.

export type ApplyTemplateStage = 'packNotCreated' | 'itemsNotAdded';

/** `packId` is set when the pack exists but its items didn't land, so the
 * caller can retry against that pack instead of making a second one. */
export class TemplateApplyError extends Error {
  readonly stage: ApplyTemplateStage;
  readonly packId: string | null;
  override readonly cause: unknown;

  constructor({
    stage,
    packId,
    cause,
  }: {
    stage: ApplyTemplateStage;
    packId: string | null;
    cause: unknown;
  }) {
    super(cause instanceof Error ? cause.message : `Template apply failed: ${stage}`);
    this.name = 'TemplateApplyError';
    this.stage = stage;
    this.packId = packId;
    this.cause = cause;
  }
}

export type ApplyTemplateDeps = {
  /** Creates the pack on the server. Idempotent on the pack id. */
  ensurePackOnServer: (pack: PackInStore) => Promise<void>;
  /** Copies every template item into the pack. Resolves to the number added. */
  copyTemplateItems: (args: { packId: string; templateId: string }) => Promise<number>;
  /** Writes the pack into the local store. */
  savePackLocally: (pack: PackInStore) => void;
  /** Pulls the server's packs and items into the local stores. */
  refresh: () => Promise<void>;
  /** Called when the post-apply refresh fails; the stores catch up on their own. */
  onRefreshError?: (error: unknown) => void;
};

const PACK_CATEGORY_SET: ReadonlySet<string> = new Set(PACK_CATEGORIES);

function toPackCategory(value: string | null | undefined): PackCategory {
  return value && PACK_CATEGORY_SET.has(value) ? (value as PackCategory) : 'custom';
}

export function buildPackFromTemplate({
  template,
  name,
  id,
  now,
}: {
  template: { description?: string | null; category?: string | null };
  name: string;
  id: string;
  now: string;
}): PackInStore {
  return {
    id,
    name: name.trim(),
    description: template.description ?? undefined,
    category: toPackCategory(template.category),
    isPublic: false,
    deleted: false,
    localCreatedAt: now,
    localUpdatedAt: now,
  };
}

/** A pack the server has returned carries `createdAt`; one only made locally
 * doesn't, and may not have synced yet. */
export function isPackOnServer(pack: Pick<PackInStore, 'createdAt'>): boolean {
  return pack.createdAt != null;
}

async function refreshBestEffort(deps: ApplyTemplateDeps): Promise<void> {
  try {
    await deps.refresh();
  } catch (error) {
    deps.onRefreshError?.(error);
  }
}

export async function applyTemplateToPack({
  pack,
  templateId,
  deps,
}: {
  pack: PackInStore;
  templateId: string;
  deps: ApplyTemplateDeps;
}): Promise<number> {
  try {
    if (!isPackOnServer(pack)) await deps.ensurePackOnServer(pack);
    const added = await deps.copyTemplateItems({ packId: pack.id, templateId });
    await refreshBestEffort(deps);
    return added;
  } catch (cause) {
    throw new TemplateApplyError({ stage: 'itemsNotAdded', packId: pack.id, cause });
  }
}

export async function createPackFromTemplate({
  pack,
  templateId,
  deps,
}: {
  pack: PackInStore;
  templateId: string;
  deps: ApplyTemplateDeps;
}): Promise<string> {
  try {
    await deps.ensurePackOnServer(pack);
  } catch (cause) {
    throw new TemplateApplyError({ stage: 'packNotCreated', packId: null, cause });
  }
  deps.savePackLocally(pack);
  try {
    await deps.copyTemplateItems({ packId: pack.id, templateId });
  } catch (cause) {
    throw new TemplateApplyError({ stage: 'itemsNotAdded', packId: pack.id, cause });
  }
  await refreshBestEffort(deps);
  return pack.id;
}

/** Splits a list into columns of `size` rows for a sideways-paging shelf. */
export function chunkIntoColumns<T>({ items, size }: { items: readonly T[]; size: number }): T[][] {
  const columns: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    columns.push(items.slice(i, i + size));
  }
  return columns;
}
