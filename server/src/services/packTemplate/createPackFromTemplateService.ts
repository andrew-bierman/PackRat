import { type ExecutionContext } from 'hono';
import { ItemPacks as ItemPacksRepository } from 'src/drizzle/methods/ItemPacks';
import { PackTemplate as PackTemplateRepository } from 'src/drizzle/methods/PackTemplate';
import { addPackService } from '../pack/addPackService';

export const createPackFromTemplateService = async (
  userId: string,
  packTemplateId: string,
  executionCtx: ExecutionContext,
) => {
  const packTemplateRepository = new PackTemplateRepository();
  const itemPacksRepository = new ItemPacksRepository();

  const packTemplate =
    await packTemplateRepository.findPackTemplate(packTemplateId);

  // TODO - creating pack and adding items to it should ideally be transactional
  const createdPack = await addPackService(
    packTemplate.name,
    userId,
    false,
    executionCtx,
  );

  for (const item of packTemplate.items) {
    await itemPacksRepository.create({
      packId: createdPack.id,
      itemId: item.id,
    });
  }

  return createdPack;
};
