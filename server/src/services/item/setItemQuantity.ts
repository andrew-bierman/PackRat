import { ItemPacks } from '../../drizzle/methods/ItemPacks';

interface GetItemsFeedParams {
  itemId: string;
  packId: string;
  quantity: number;
}
export const setItemQuantityService = async ({
  packId,
  itemId,
  quantity,
}: GetItemsFeedParams) => {
  const itemClass = new ItemPacks();

  await itemClass.setItemQuantity({ packId, itemId, quantity });
};
