import { ItemPackTemplate } from '../../drizzle/methods/ItemPackTemplate';

/**
 * Adds a item to the pack template service.
 * @param {string} packTemplateId - The ID of the pack template.
 * @param {string} itemId - The ID reference of the item.
 * @param {number} quantity - The ID of the owner.
 * @return {Promise<object>} - A promise that resolves to the added item.
 */
export const addItemPackTemplate = async (params: {
  packTemplateId: string;
  itemId: string;
  quantity: number;
}) => {
  const { packTemplateId, itemId, quantity } = params;
  const itemPackTemplate = new ItemPackTemplate();
  const item = await itemPackTemplate.findByItemIdAndPackTemplateId({
    packTemplateId,
    itemId,
  });

  if (item) {
    throw new Error(
      'A template item with the same item and pack references already exists',
    );
  }
  await itemPackTemplate.create({ itemId, packTemplateId, quantity });
};
