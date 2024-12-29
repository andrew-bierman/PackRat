import { describe, it, expect, beforeAll, vi } from 'vitest';
import { env } from 'cloudflare:test';
import { ItemCategory as ItemCategoryRepository } from '../../drizzle/methods/itemcategory';
import { Item as ItemRepository } from '../../drizzle/methods/Item';
import { setupTest } from '../testHelpers';
import type { trpcCaller } from '../testHelpers';
import {
  type PackTemplate,
  type Item,
  itemPackTemplate as itemPackTemplatesTable,
  packTemplate as packTemplateTable,
} from '../../db/schema';
import { DbClient } from '../../db/client';

const { mockSyncRecord, mockDeleteVector, mockSearchVector } = vi.hoisted(
  () => {
    return {
      mockSyncRecord: vi.fn(),
      mockDeleteVector: vi.fn(),
      mockSearchVector: vi.fn(),
    };
  },
);
vi.mock('../../vector/client', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../vector/client')>();
  return {
    ...mod,
    VectorClient: {
      instance: {
        syncRecord: mockSyncRecord,
        delete: mockDeleteVector,
        search: mockSearchVector,
      },
    },
  };
});

describe('Pack template routes', () => {
  let caller: trpcCaller;
  const itemCategoryRepository = new ItemCategoryRepository();
  const itemRepository = new ItemRepository();

  let packTemplate: PackTemplate;
  let packTemplateItems: Item[];

  beforeAll(async () => {
    const executionCtx: ExecutionContext = {
      waitUntil: () => {},
      passThroughOnException: () => {},
    };
    caller = await setupTest(env, executionCtx);

    vi.resetModules();

    const { id: foodCategoryId } = await itemCategoryRepository.create({
      name: 'Food',
    });
    const { id: waterCategoryId } = await itemCategoryRepository.create({
      name: 'Water',
    });
    const { id: essentialsCategoryId } = await itemCategoryRepository.create({
      name: 'Essentials',
    });

    const lightweightBackpack = {
      name: 'Lightweight Backpack',
      weight: 1.5,
      quantity: 1,
      unit: 'kg',
      categoryId: essentialsCategoryId,
      owner_id: null,
    };
    const waterBottle = {
      name: 'Water Bottle',
      weight: 0.5,
      quantity: 2,
      unit: 'kg',
      categoryId: waterCategoryId,
      owner_id: null,
    };
    const tailMix = {
      name: 'Trail Mix',
      weight: 0.3,
      quantity: 5,
      unit: 'kg',
      categoryId: foodCategoryId,
      ownerId: null,
    };

    packTemplateItems = await itemRepository.createBulk([
      lightweightBackpack,
      waterBottle,
      tailMix,
    ]);

    packTemplate = await DbClient.instance
      .insert(packTemplateTable)
      .values({
        name: 'test',
        description: 'pack template description',
      })
      .returning()
      .get();

    await DbClient.instance.insert(itemPackTemplatesTable).values(
      packTemplateItems.map((item) => ({
        itemId: item.id,
        packTemplateId: packTemplate.id,
      })),
    );
  });

  describe('getPackTemplates', () => {
    it('should get pack templates', async () => {
      const packTemplates = await caller.getPackTemplates({
        pagination: { limit: 10, offset: 0 },
      });
      expect(packTemplates).toMatchObject([
        { ...packTemplate, items: packTemplateItems },
      ]);
    });
  });

  describe('addPackTemplate', () => {
    it('should add pack template', async () => {
      const packTemplate = await caller.addPackTemplate({
        name: 'test',
        description: 'pack template description',
        type: 'pack',
        itemsOwnerId: 'default_owner_id',
        itemPackTemplates: packTemplateItems.map((item) => ({
          quantity: 1,
          item: {
            name: item.name,
            type: 'Food' as const,
            weight: item.weight,
            unit: item.unit,
          },
        })),
      });
      expect(packTemplate).toMatchObject([
        { ...packTemplate, items: packTemplateItems },
      ]);
    });
  });

  describe('getPackTemplate', () => {
    it('should get a pack template', async () => {
      const packTemplateResult = await caller.getPackTemplate({
        id: packTemplate.id,
      });
      expect(packTemplateResult?.id).toEqual(packTemplate.id);
    });
  });

  describe('createPackFromTemplate', () => {
    it('should create a pack from pack template', async () => {
      const newPackName = 'My new duplicated pack';
      const pack = await caller.createPackFromTemplate({
        packTemplateId: packTemplate.id,
        newPackName,
      });
      expect(pack.name).toEqual(newPackName);
    });
  });
});
