import { ItemImages } from '../../drizzle/methods/ItemImages';
export const getItemImagesByIdService = async (id: string) => {
  const itemClass = new ItemImages();
  const item = await itemClass.getByItemId({ itemId: id });
  return item;
};
