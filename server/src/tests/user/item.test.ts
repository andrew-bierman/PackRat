import { inferProcedureInput } from '@trpc/server';
// import { createContextInner } from '@trpc/server/dist/createContext';
import { AppRouter, createCaller } from '../../routes/trpcRouter';
import { generateMock } from '@anatine/zod-mock';
import * as validator from '../../middleware/validators/index';
import mongoose from 'mongoose';
import { ItemCategoryEnum } from '../../utils/itemCategory';

beforeEach(async () => {
  console.log('before all');
  process.env.NODE_ENV = 'test';
  await mongoose.connect(process.env.MONGODB_URI ?? '');
});

afterEach(async () => {
  console.log('after all');
  await mongoose.disconnect();
});

const caller = createCaller({});

type Item = {
  name?     : string
  _id?     : any
  weight?   : string
  quantity? : string,
  unit?     : string,
  packId?   : any,
  type?     : string,
  ownerId?  : string,
}



describe("ITEM", () => {
  let pack : any
  let item : Item = generateMock(validator.addItem)
  describe('Get items', () => {
    it('Should can get public packs', async() =>{
      const packs = await caller.getPublicPacks({
        queryBy: 'Favorite',
      });
      pack = packs[0]
      // console.log('pack', pack)
      expect(packs).toBeDefined();
    })

    it('Should can get items by packId', async() =>{
      console.log('packId', pack._id.toString())
      const getItems = await caller.getItems({
        packId : pack._id.toString()
      }) as any
      // console.log('items', getItems)
      expect(getItems).toBeDefined();
      item = getItems[0]
    })
  })

  it("Should can get item by ID", async() => {
    console.log('itemId', item._id.toString())
    const getItem = await caller.getItemById({
      _id : item._id.toString()
    })
    console.log('item', getItem)
    expect(getItem._id).toEqual(item._id);
  })

  it("Should can search item by name", async() => {
    console.log('itemId', item._id.toString())
    const getItem = await caller.searchItemsByName({
      name : item.name
    })
    // console.log('item', getItem)
    expect(getItem).toBeDefined()
    // expect(getItem._id).toEqual(item._id);
  })

  it("Should can add item", async() => {
    const addItem = await caller.addItem({
      name     : 'cherry',
      weight   : "100",
      quantity : "100",
      unit     : '1b',
      packId   : pack._id.toString(),
    })
    // console.log('addItem', addItem)
    expect(addItem).toBeDefined()
  })

  it("Should can edit item", async() => {
    console.log('item id', item._id.toString())
    const editItem = await caller.editItem({
      _id      : item._id.toString(),
      name     : `${item.name}edited`,
      weight   : "100",
      quantity : "100",
      unit     : '1b',
      type     : ItemCategoryEnum.FOOD
      // packId   : pack._id.toString(),
    })
    // console.log('editItem', editItem)
    expect(editItem.name).toEqual(`${item.name}edited`)
  })


})

describe("ITEM GLOBAL", () => {
  let globalItem
  let pack

  it("Should can add item Global", async() => {
    const name = 'global ' + Math.floor(Math.random() * 100)
    const addGlobalItem = await caller.addItemGlobal({
      name     : name,
      weight   : "2",
      quantity : "2",
      unit     : 'kg',
      type     : ItemCategoryEnum.FOOD,
    })
    globalItem = addGlobalItem.toJSON()
    expect(addGlobalItem).toBeDefined();
  })

  describe("add global item to pack", () => {
    it("Should can get packs", async() => {
      const packs = await caller.getPublicPacks({
        queryBy: 'Favorite',
      });
      pack = packs[0]
      console.log('pack', pack)
      expect(packs).toBeDefined();
    })

    it("Should can add global item to pack", async() => {
      const addGlobalItemToPack = await caller.addGlobalItemToPack({
        itemId : globalItem._id.toString(),
        packId : pack._id.toString(),
        ownerId : pack.owner_id.toString()
      });
      // console.log('addGlobalItemToPack', addGlobalItemToPack)
      expect(addGlobalItemToPack).toBeDefined();
    })

    it("Should can get globalItem's ownerId and packId", async() => {
      const getItem = await caller.getItemsGlobally({
        page : 1,
        limit : 1,
        searchString : globalItem.name
      })
      expect(getItem.page).toEqual(1);
      expect(getItem.items).toBeDefined();
      expect(getItem.items[0].packs[0]._id.toString()).toEqual(pack._id.toString());
      expect(getItem.items[0].owners[0]._id.toString()).toEqual(pack.owner_id.toString());
      
    })
  })

  it("Should can get item Global", async() => {
    const getItem = await caller.getItemsGlobally({
      page : 1,
      limit : 10,
      searchString : ""
    })
    // console.log('getitem', getItem)
    expect(getItem.items).toBeDefined();
    expect(getItem.page).toEqual(1);
  })
  

  it("Should can edit global item as duplicate", async() => {
    const editGlobalItemAsDuplicate = await caller.editGlobalItemAsDuplicate({
      itemId : globalItem._id.toString(),
      packId : pack._id.toString(),
      name     : globalItem.name + "edit",
      weight   : 3,
      quantity : 3,
      unit     : "kg",
      type     : ItemCategoryEnum.FOOD,
    })
    expect(editGlobalItemAsDuplicate.name).toEqual(globalItem.name + "edit");
  })

  it("Should can delete global item", async() => {
    const deleteGlobalItem = await caller.deleteGlobalItem({
      itemId : globalItem._id.toString()
    })
    console.log('deleteGlobalItem', deleteGlobalItem)
    expect(deleteGlobalItem).toBeDefined();
  })
})