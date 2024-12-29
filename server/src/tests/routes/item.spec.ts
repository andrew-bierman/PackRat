import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { setupTest } from '../testHelpers';
import type { trpcCaller } from '../testHelpers';
import { env } from 'cloudflare:test';
import { Pack as PackClass } from '../../drizzle/methods/pack';
import { User as UserClass } from '../../drizzle/methods/User';
import type { Item, Pack, User } from '../../db/schema';
import { Item as ItemClass } from '../../drizzle/methods/Item';

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

describe('Item routes', () => {
  let caller: trpcCaller;
  let executionCtx: ExecutionContext;
  const itemClass = new ItemClass();
  const packClass = new PackClass();
  const userClass = new UserClass();

  let item: Item;
  let pack: Pack;
  let owner: User;

  beforeAll(async () => {
    const executionCtx = {} as ExecutionContext;
    caller = await setupTest(env, executionCtx);
    pack = await packClass.create({
      name: 'test',
      type: 'test',
    });
    owner = (await userClass.create({
      email: 'test@abc.com',
      name: 'test',
      username: 'test',
      password: 'test123',
    })) as User;

    // clear modules cache to ensure that dependents use the latest mock modules
    // this prevents unusual assertion failures during reruns in watch mode
    vi.resetModules();
  });

  beforeEach(async () => {
    item = await itemClass.create({
      name: 'test',
      unit: 'g',
      weight: 1,
      global: true,
      ownerId: owner.id,
    });
  });

  describe('getItems', () => {
    it('should get items', async () => {
      const items = await caller.getItems({});
      expect(items).toBeDefined();
      expect(items.length).toEqual(1);
    });
  });

  describe('getItemById', () => {
    it('should get item by ID', async () => {
      const foundItem = await caller.getItemById({ id: item.id });
      expect(foundItem?.id).toEqual(item.id);
    });
  });

  describe('searchItemsByName', () => {
    it('should get items by name', async () => {
      const searchedItems = await caller.searchItemsByName({ name: item.name });
      const isEveryItemSimilarlyNamed = searchedItems.every((item) =>
        item.name.includes(item.name),
      );
      expect(searchedItems).toBeDefined();
      expect(searchedItems.length).toEqual(1);
      expect(isEveryItemSimilarlyNamed).toBeTruthy();
    });
  });

  describe('addItem', () => {
    let itemId: string;
    let isPublic: boolean;
    it('should create a new item', async () => {
      const { id, ...partialItem } = item;
      const input = {
        ...partialItem,
        quantity: 1,
        type: 'Food' as const,
        packId: pack.id,
        ownerId: owner.id,
      };
      const createdItem = await caller.addItem(input);
      itemId = createdItem.id;
      isPublic = !!createdItem.global;
      expect(createdItem).toBeDefined();
    });

    it('should sync created item with vectorize', async () => {
      // await waitOnExecutionContext(executionCtx);
      expect(mockSyncRecord).toHaveBeenCalledWith({
        id: itemId,
        content: 'test',
        metadata: { isPublic, ownerId: owner.id },
        namespace: 'items',
      });
    });
  });

  describe('editItem', () => {
    const nameToBeUpdated = 'test 123';
    let itemId: string;
    it('should update an item', async () => {
      const input = {
        ...item,
        name: nameToBeUpdated,
        quantity: 1,
        type: 'Food' as const,
        packId: pack.id,
      };
      const createdItem = await caller.editItem(input);
      itemId = createdItem.id;
      expect(createdItem.name).toEqual(nameToBeUpdated);
    });

    it('should sync edited item with vectorize', async () => {
      // await waitOnExecutionContext(executionCtx);
      expect(mockSyncRecord).toHaveBeenCalledWith(
        {
          id: itemId,
          content: nameToBeUpdated,
          metadata: { isPublic: true, ownerId: owner.id },
          namespace: 'items',
        },
        true,
      );
    });
  });

  describe('deleteItem', () => {
    let itemId: string;
    it('should delete the item', async () => {
      itemId = item.id;
      const { message } = await caller.deleteItem({
        itemId: item.id,
        packId: pack.id,
      });
      expect(message).toEqual('Item deleted successfully');
    });

    it('should delete the pack from vectorize', async () => {
      // await waitOnExecutionContext(executionCtx);
      expect(mockDeleteVector).toHaveBeenCalledWith(itemId);
    });
  });

  describe('addItemGlobal', () => {
    let itemId: string;
    it('should create a new global item', async () => {
      const { id, ...partialItem } = item;
      const input = {
        ...partialItem,
        name: 'test 123',
        quantity: 1,
        type: 'Food' as const,
        packId: pack.id,
        ownerId: owner.id,
        description: partialItem.description ?? '',
        sku: partialItem.sku ?? '',
        productUrl: partialItem.productUrl ?? '',
        productDetails: Object.fromEntries(
          Object.entries(partialItem.productDetails ?? {}).filter(
            ([, value]) => value !== null,
          ),
        ) as Record<string, string | number | boolean>,
        seller: partialItem.seller ?? '',
      };
      const createdItem = await caller.addItemGlobal(input);
      itemId = createdItem.id;
      expect(createdItem).toBeDefined();
    });

    it('should sync new global item with vectorize', async () => {
      // await waitOnExecutionContext(executionCtx);
      expect(mockSyncRecord).toHaveBeenCalledWith({
        id: itemId,
        content: 'test 123',
        metadata: { isPublic: true, ownerId: owner.id },
        namespace: 'items',
      });
    });
  });

  describe('getItemsGlobally', () => {
    it('should get items globally', async () => {
      const { items } = await caller.getItemsGlobally({
        limit: 10,
        page: 1,
      });
      expect(items).toBeDefined();
      expect(items.length).toEqual(1);
    });
  });

  describe('addGlobalItemToPack', () => {
    it('should add the global item to the specified pack', async () => {
      const packItem = await caller.addGlobalItemToPack({
        itemId: item.id,
        ownerId: owner.id,
        packId: pack.id,
        quantity: 1,
      });
      expect(packItem).toBeDefined();
    });
  });

  describe('editGlobalItemAsDuplicate', () => {
    let itemId: string;
    let itemName: string;
    let isPublic: boolean;
    it('should duplicate a global item', async () => {
      const {
        // following de-structured properties never match with the original item
        id: duplicateItemId,
        categoryId: dupCategory,
        createdAt: dupCreatedAt,
        global: dupGlobal,
        ownerId: dupOwnerId,
        ...partialDuplicatedItem
      } = await caller.editGlobalItemAsDuplicate({
        ...item,
        itemId: item.id,
        packId: pack.id,
        type: 'Food',
      });

      itemId = duplicateItemId;
      itemName = partialDuplicatedItem.name;
      isPublic = !!dupGlobal;

      const {
        id: originalItemId,
        categoryId,
        createdAt,
        global,
        ownerId,
        ...partialOriginalItem
      } = item;

      expect(partialDuplicatedItem).toMatchObject(partialOriginalItem);
    });

    it('should sync duplicate item with vectorize', async () => {
      // await waitOnExecutionContext(executionCtx);
      expect(mockSyncRecord).toHaveBeenCalledWith({
        id: itemId,
        content: itemName,
        metadata: {
          isPublic,
        },
        namespace: 'items',
      });
    });
  });

  describe('getSimilarItems', () => {
    let similarItems: any = null;
    let itemId: string;
    it('should invoke vector search', async () => {
      itemId = item.id;
      mockSearchVector.mockResolvedValue({
        result: { matches: [{ id: itemId, score: 0.89519173 }] },
      });

      similarItems = await caller.getSimilarItems({
        id: itemId,
        limit: 3,
      });
      expect(mockSearchVector).toHaveBeenCalledWith(item.name, 'items', 3, {
        isPublic: true,
      });
    });

    it('should return similar items', async () => {
      expect(similarItems).toEqual([
        { ...item, id: itemId, similarityScore: 0.89519173 },
      ]);
    });
  });
});
