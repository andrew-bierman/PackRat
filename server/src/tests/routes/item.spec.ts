import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { setupTest } from '../testHelpers';
import type { trpcCaller } from '../testHelpers';
import { env } from 'cloudflare:test';
import { Pack as PackClass } from '../../drizzle/methods/pack';
import { User as UserClass } from '../../drizzle/methods/User';
import type { Item, Pack, User } from '../../db/schema';
import { Item as ItemClass } from '../../drizzle/methods/Item';

describe('Item routes', () => {
  let caller: trpcCaller;
  const itemClass = new ItemClass();
  const packClass = new PackClass();
  const userClass = new UserClass();

  let item: Item;
  let pack: Pack;
  let owner: User;

  beforeAll(async () => {
    caller = await setupTest(env);
    pack = await packClass.create({
      name: 'test',
      type: 'test',
    });
    owner = await userClass.create({
      email: 'test@abc.com',
      name: 'test',
      username: 'test',
      password: 'test123',
    });
  });

  beforeEach(async () => {
    item = await itemClass.create({
      name: 'test',
      quantity: 1,
      unit: 'g',
      weight: 1,
      global: true,
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
    it('should create a new item', async () => {
      const { id, ...partialItem } = item;
      const input = {
        ...partialItem,
        packId: pack.id,
        ownerId: owner.id,
        type: 'Food',
      };
      const createdItem = await caller.addItem(input);
      expect(createdItem).toBeDefined();
    });
  });

  describe('editItem', () => {
    it('should update an item', async () => {
      const nameToBeUpdated = 'test 123';
      const input = {
        ...item,
        name: nameToBeUpdated,
        type: 'Food',
      };
      const createdItem = await caller.editItem(input);
      expect(createdItem.name).toEqual(nameToBeUpdated);
    });
  });

  describe('deleteItem', () => {
    it('should delete the item', async () => {
      const { message } = await caller.deleteItem({
        itemId: item.id,
        packId: pack.id,
      });
      expect(message).toEqual('Item deleted successfully');
    });
  });

  describe('addItemGlobal', () => {
    it('should create a new global item', async () => {
      const { id, ...partialItem } = item;
      const input = {
        ...partialItem,
        name: 'test 123',
        packId: pack.id,
        ownerId: owner.id,
        type: 'Food',
      };
      const createdItem = await caller.addItemGlobal(input);
      expect(createdItem).toBeDefined();
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
      });
      expect(packItem).toBeDefined();
    });
  });

  describe('editGlobalItemAsDuplicate', () => {
    it('should duplicate a global item', async () => {
      const {
        // following de-structured properties never match with the original item
        id: duplicateItemId,
        categoryId: dupCategory,
        createdAt: dupCreatedAt,
        global: dupGlobal,
        ...partialDuplicatedItem
      } = await caller.editGlobalItemAsDuplicate({
        ...item,
        itemId: item.id,
        packId: pack.id,
        type: 'Food',
      });

      const {
        id: originalItemId,
        categoryId,
        createdAt,
        global,
        ...partialOriginalItem
      } = item;

      expect(partialDuplicatedItem).toMatchObject(partialOriginalItem);
    });
  });
});
