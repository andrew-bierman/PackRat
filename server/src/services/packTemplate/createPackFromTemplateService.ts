import { type ExecutionContext } from 'hono';
import { PackTemplate as PackTemplateRepository } from '../../drizzle/methods/PackTemplate';
import { addPackService } from '../pack/addPackService';
import { addItemService } from '../item/addItemService';

export const createPackFromTemplateService = async (
  userId: string,
  packTemplateId: string,
  newPackName: string,
  executionCtx: ExecutionContext,
) => {
  const packTemplateRepository = new PackTemplateRepository();

  const packTemplate = await packTemplateRepository.findPackTemplate({
    id: packTemplateId,
  });

  if (!packTemplate) {
    throw new Error('PackTemplate not found');
  }

  // TODO - creating pack and adding items to it should ideally be transactional
  const createdPack = await addPackService(
    newPackName,
    userId,
    false,
    executionCtx,
  );

  const validCategories = ['Food', 'Water', 'Essentials'];

  for (const item of packTemplate.itemPackTemplates) {
    if (!item.item) {
      continue; // Skip if item.item is null or undefined
    }

    const category =
      item.item.category && validCategories.includes(item.item.category.name)
        ? item.item.category.name
        : 'Essentials';

    await addItemService(
      item.item.name ?? 'defaultName',
      item.item.weight,
      item.quantity,
      item.item.unit,
      createdPack.id,
      category,
      userId,
      executionCtx,
    );
  }

  return createdPack;
};
