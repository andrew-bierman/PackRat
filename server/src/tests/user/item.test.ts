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

  // addItemGlobal: addItemGlobalRoute(),
  // getItemsGlobally: getItemsGloballyRoute(),
  // addGlobalItemToPack: addGlobalItemToPackRoute(),
  // editGlobalItemAsDuplicate: editGlobalItemAsDuplicateRoute(),
  // deleteGlobalItem: deleteGlobalItemRoute(),

})