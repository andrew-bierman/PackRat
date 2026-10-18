import { safeJsonStringify } from '@packrat/utils';
import * as Sentry from '@sentry/react-native';
import { packItemsSyncState, packsStore, packsSyncState } from 'expo-app/features/packs/store';
import type { PackInStore } from 'expo-app/features/packs/types';
import { apiClient } from 'expo-app/lib/api/packrat';
import { obs } from 'expo-app/lib/store';
import { nanoid } from 'nanoid';
import { useCallback, useMemo } from 'react';
import type { PackTemplate } from '../types';
import {
  type ApplyTemplateDeps,
  applyTemplateToPack,
  buildPackFromTemplate,
  createPackFromTemplate,
  TemplateApplyError,
} from '../utils/applyPackTemplate';

class ApiRequestError extends Error {
  readonly httpStatus: number;
  constructor({ message, httpStatus }: { message: string; httpStatus: number }) {
    super(message);
    this.name = 'ApiRequestError';
    this.httpStatus = httpStatus;
  }
}

async function ensurePackOnServer(pack: PackInStore): Promise<void> {
  const now = new Date().toISOString();
  const { error } = await apiClient.packs.post({
    id: pack.id,
    name: pack.name,
    description: pack.description ?? undefined,
    category: pack.category,
    isPublic: pack.isPublic,
    image: pack.image,
    tags: pack.tags ?? undefined,
    localCreatedAt: pack.localCreatedAt ?? now,
    localUpdatedAt: pack.localUpdatedAt ?? now,
  });
  if (error) {
    throw new ApiRequestError({
      message: `Failed to create pack: ${safeJsonStringify(error.value)}`,
      httpStatus: error.status,
    });
  }
}

async function copyTemplateItems({
  packId,
  templateId,
}: {
  packId: string;
  templateId: string;
}): Promise<number> {
  const { data, error } = await apiClient.packs({ packId })['apply-template'].post({ templateId });
  if (error || !data) {
    throw new ApiRequestError({
      message: `Failed to apply template: ${safeJsonStringify(error?.value)}`,
      httpStatus: error?.status ?? 0,
    });
  }
  return data.items.length;
}

const deps: ApplyTemplateDeps = {
  ensurePackOnServer,
  copyTemplateItems,
  savePackLocally: (pack) => obs({ store: packsStore, id: pack.id }).set(pack),
  refresh: async () => {
    await Promise.all([packsSyncState.sync(), packItemsSyncState.sync()]);
  },
  onRefreshError: (error) => {
    Sentry.captureException(error, {
      tags: { feature: 'packTemplates', action: 'applyTemplate.refresh' },
    });
  },
};

function capture({
  error,
  action,
  extra,
}: {
  error: unknown;
  action: string;
  extra: Record<string, unknown>;
}) {
  const root = error instanceof TemplateApplyError ? error.cause : error;
  Sentry.captureException(root, {
    tags: { feature: 'packTemplates', action },
    extra: {
      ...extra,
      stage: error instanceof TemplateApplyError ? error.stage : undefined,
      httpStatus: root instanceof ApiRequestError ? root.httpStatus : undefined,
    },
  });
}

/** Copies a template's items into a pack on the server in one request. */
export function useApplyPackTemplate() {
  const applyToPack = useCallback(
    async ({ template, pack }: { template: PackTemplate; pack: PackInStore }) => {
      Sentry.addBreadcrumb({
        category: 'packTemplates',
        message: 'Apply template to pack',
        level: 'info',
        data: { templateId: template.id, packId: pack.id },
      });
      try {
        return await applyTemplateToPack({ pack, templateId: template.id, deps });
      } catch (error) {
        capture({
          error,
          action: 'applyToPack',
          extra: { templateId: template.id, packId: pack.id },
        });
        throw error;
      }
    },
    [],
  );

  const createFromTemplate = useCallback(
    async ({ template, name }: { template: PackTemplate; name: string }) => {
      const pack = buildPackFromTemplate({
        template,
        name,
        id: nanoid(),
        now: new Date().toISOString(),
      });
      Sentry.addBreadcrumb({
        category: 'packTemplates',
        message: 'Create pack from template',
        level: 'info',
        data: { templateId: template.id, packId: pack.id },
      });
      try {
        return await createPackFromTemplate({ pack, templateId: template.id, deps });
      } catch (error) {
        capture({
          error,
          action: 'createFromTemplate',
          extra: { templateId: template.id, packId: pack.id },
        });
        throw error;
      }
    },
    [],
  );

  return useMemo(() => ({ applyToPack, createFromTemplate }), [applyToPack, createFromTemplate]);
}
