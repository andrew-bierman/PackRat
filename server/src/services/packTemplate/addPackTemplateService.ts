import { PackTemplate as PackTemplateClass } from '../../drizzle/methods/PackTemplate';
import * as ItemPackTemplateService from '../itemPackTemplate/itemPackTemplate.service';
import { PackTemplate } from 'src/db/schema';

/**
 * Adds a new pack template service.
 * @param {Object} packTemplateData - The data for the new pack template.
 * @param {string} packTemplateData.name - The name of the pack.
 * @param {string} packTemplateData.description - The description of the pack.
 * @param {string} packTemplateData.type - Whether the pack is public or not.
 * @return {Object} An object containing the created pack.
 */
export const addPackTemplateService = async (packTemplateData: {
  name: string;
  description: string;
  type: string;
  itemPackTemplates: Array<{
    itemId: string;
    quantity: number;
  }>;
}): Promise<PackTemplate> => {
  const { name, description, type } = packTemplateData;
  console.log({ packTemplateData });
  const packTemplateClass = new PackTemplateClass();
  let existingPack: PackTemplate | null =
    await packTemplateClass.findPackTemplate({ name });

  if (!existingPack) {
    existingPack = await packTemplateClass.create({
      name,
      description,
      type,
    });
  } else {
    console.log(
      'Pack template already exists. Skipping creation and proceeding with update of items',
    );
  }

  for (const itemPackTemplate of packTemplateData.itemPackTemplates) {
    try {
      await ItemPackTemplateService.addItemPackTemplate({
        itemId: itemPackTemplate.itemId,
        quantity: itemPackTemplate.quantity,
        packTemplateId: existingPack.id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return existingPack;
};
