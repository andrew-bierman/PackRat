import { type ExecutionContext } from 'hono';
import { PackTemplate as PackTemplateRepository } from 'src/drizzle/methods/PackTemplate';
import { addPackService } from '../pack/addPackService';
import { addItemService } from '../item/addItemService';

export const createPackFromTemplateService = async (
  userId: string,
  packTemplateId: string,
  newPackName: string,
  executionCtx: ExecutionContext,
) => {
  const packTemplateRepository = new PackTemplateRepository();

  const packTemplate =
    await packTemplateRepository.findPackTemplate(packTemplateId);

  // TODO - creating pack and adding items to it should ideally be transactional
  const createdPack = await addPackService(
    newPackName,
    userId,
    false,
    executionCtx,
  );

  for (const item of packTemplate.items) {
    await addItemService(
      item.name,
      item.weight,
      item.quantity,
      item.unit,
      createdPack.id,
      item.category.name,
      userId,
      executionCtx,
    );
  }

  return createdPack;
};
