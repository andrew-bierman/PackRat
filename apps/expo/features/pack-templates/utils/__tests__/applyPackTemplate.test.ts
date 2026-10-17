import type { PackInStore } from 'expo-app/features/packs/types';
import { describe, expect, it, vi } from 'vitest';
import {
  type ApplyTemplateDeps,
  applyTemplateToPack,
  buildPackFromTemplate,
  chunkIntoColumns,
  createPackFromTemplate,
  isPackOnServer,
  TemplateApplyError,
} from '../applyPackTemplate';

const NOW = '2026-10-17T12:00:00.000Z';

function makeDeps(overrides: Partial<ApplyTemplateDeps> = {}) {
  const calls: string[] = [];
  const deps: ApplyTemplateDeps = {
    ensurePackOnServer: vi.fn(async () => {
      calls.push('ensure');
    }),
    copyTemplateItems: vi.fn(async () => {
      calls.push('copy');
      return 12;
    }),
    savePackLocally: vi.fn(() => {
      calls.push('save');
    }),
    refresh: vi.fn(async () => {
      calls.push('refresh');
    }),
    onRefreshError: vi.fn(),
    ...overrides,
  };
  return { deps, calls };
}

const localPack: PackInStore = buildPackFromTemplate({
  template: { description: 'Desc', category: 'hiking' },
  name: 'Trip',
  id: 'p1',
  now: NOW,
});
const syncedPack: PackInStore = { ...localPack, createdAt: NOW };

describe('buildPackFromTemplate', () => {
  it('copies description and a valid category, trims the name and starts private', () => {
    expect(
      buildPackFromTemplate({
        template: { description: 'Three days', category: 'backpacking' },
        name: '  JMT Section  ',
        id: 'abc',
        now: NOW,
      }),
    ).toEqual({
      id: 'abc',
      name: 'JMT Section',
      description: 'Three days',
      category: 'backpacking',
      isPublic: false,
      deleted: false,
      localCreatedAt: NOW,
      localUpdatedAt: NOW,
    });
  });

  it('falls back to custom for an unknown or missing category and drops a null description', () => {
    const unknown = buildPackFromTemplate({
      template: { description: null, category: 'bikepacking' },
      name: 'A',
      id: '1',
      now: NOW,
    });
    expect(unknown.category).toBe('custom');
    expect(unknown.description).toBeUndefined();
    expect(buildPackFromTemplate({ template: {}, name: 'B', id: '2', now: NOW }).category).toBe(
      'custom',
    );
  });
});

describe('isPackOnServer', () => {
  it('is true only once the server has stamped createdAt', () => {
    expect(isPackOnServer({ createdAt: NOW })).toBe(true);
    expect(isPackOnServer({})).toBe(false);
  });
});

describe('applyTemplateToPack', () => {
  it('copies straight into a synced pack, then refreshes', async () => {
    const { deps, calls } = makeDeps();
    await expect(applyTemplateToPack({ pack: syncedPack, templateId: 't1', deps })).resolves.toBe(
      12,
    );
    expect(calls).toEqual(['copy', 'refresh']);
    expect(deps.copyTemplateItems).toHaveBeenCalledWith({ packId: 'p1', templateId: 't1' });
  });

  it('creates a not-yet-synced pack on the server before copying', async () => {
    const { deps, calls } = makeDeps();
    await applyTemplateToPack({ pack: localPack, templateId: 't1', deps });
    expect(calls).toEqual(['ensure', 'copy', 'refresh']);
    expect(deps.ensurePackOnServer).toHaveBeenCalledWith(localPack);
  });

  it('wraps a copy failure as itemsNotAdded against the same pack', async () => {
    const cause = new Error('offline');
    const { deps } = makeDeps({ copyTemplateItems: vi.fn().mockRejectedValue(cause) });
    const error = await applyTemplateToPack({ pack: syncedPack, templateId: 't1', deps }).catch(
      (e: unknown) => e,
    );
    expect(error).toBeInstanceOf(TemplateApplyError);
    expect(error).toMatchObject({
      stage: 'itemsNotAdded',
      packId: 'p1',
      cause,
      message: 'offline',
    });
  });

  it('treats a failed refresh as success and reports it', async () => {
    const refreshError = new Error('list failed');
    const { deps } = makeDeps({ refresh: vi.fn().mockRejectedValue(refreshError) });
    await expect(applyTemplateToPack({ pack: syncedPack, templateId: 't1', deps })).resolves.toBe(
      12,
    );
    expect(deps.onRefreshError).toHaveBeenCalledWith(refreshError);
  });

  it('tolerates a failed refresh with no reporter', async () => {
    const { deps } = makeDeps({
      refresh: vi.fn().mockRejectedValue(new Error('x')),
      onRefreshError: undefined,
    });
    await expect(applyTemplateToPack({ pack: syncedPack, templateId: 't1', deps })).resolves.toBe(
      12,
    );
  });
});

describe('createPackFromTemplate', () => {
  it('creates on the server, saves locally, copies, then refreshes', async () => {
    const { deps, calls } = makeDeps();
    await expect(createPackFromTemplate({ pack: localPack, templateId: 't1', deps })).resolves.toBe(
      'p1',
    );
    expect(calls).toEqual(['ensure', 'save', 'copy', 'refresh']);
    expect(deps.savePackLocally).toHaveBeenCalledWith(localPack);
  });

  it('fails as packNotCreated without touching the local store', async () => {
    const { deps } = makeDeps({ ensurePackOnServer: vi.fn().mockRejectedValue('network down') });
    const error = await createPackFromTemplate({ pack: localPack, templateId: 't1', deps }).catch(
      (e: unknown) => e,
    );
    expect(error).toMatchObject({
      stage: 'packNotCreated',
      packId: null,
      cause: 'network down',
      message: 'Template apply failed: packNotCreated',
    });
    expect(deps.savePackLocally).not.toHaveBeenCalled();
    expect(deps.copyTemplateItems).not.toHaveBeenCalled();
  });

  it('fails as itemsNotAdded carrying the created pack id', async () => {
    const { deps } = makeDeps({ copyTemplateItems: vi.fn().mockRejectedValue(new Error('500')) });
    const error = await createPackFromTemplate({ pack: localPack, templateId: 't1', deps }).catch(
      (e: unknown) => e,
    );
    expect(error).toMatchObject({
      name: 'TemplateApplyError',
      stage: 'itemsNotAdded',
      packId: 'p1',
    });
    expect(deps.savePackLocally).toHaveBeenCalledWith(localPack);
    expect(deps.refresh).not.toHaveBeenCalled();
  });
});

describe('chunkIntoColumns', () => {
  it('splits into columns of the given size with a short last column', () => {
    expect(chunkIntoColumns({ items: [1, 2, 3, 4, 5, 6, 7], size: 3 })).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7],
    ]);
  });

  it('returns no columns for no items', () => {
    expect(chunkIntoColumns({ items: [], size: 3 })).toEqual([]);
  });
});
