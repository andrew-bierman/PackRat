import { Pack as PackRepository } from 'src/drizzle/methods/pack';
import { ItemPacks as PackItemRepository } from 'src/drizzle/methods/ItemPacks';
import { Item as ItemRepository } from 'src/drizzle/methods/Item';

export const createPackFromTemplateService = async (
  userId: string,
  packId: string,
) => {
  await new Promise((res) => setTimeout(res, 3000));
  const packRepository = new PackRepository();
  const packItemRepository = new PackItemRepository();
  const itemRepository = new ItemRepository();

  const pack = await packRepository.findPack({ id: packId });
  const newPack = await packRepository.create({
    name: pack.name + 'temmplate',
    owner_id: userId,
    // is_template: false, TODO (current) add is_template field to pack schema and migrate
  });

  pack.itemPacks
    .map((itemPack) => itemPack.item)
    .forEach(async (itemId: any) => {
      const item = await itemRepository.findItem({ id: itemId }); // TODO (current) findMany
      const newItem = await itemRepository.create({
        name: item.name,
        weight: item.weight,
        quantity: item.quantity,
        unit: item.unit,
        categoryId: item.categoryId,
        ownerId: userId,
      });
      await packItemRepository.create({
        itemId: newItem.id,
        packId: newPack.id,
      });
    });

  return await packRepository.findPack({ id: newPack.id });

  return {
    ...newPack,
    scores: newPack.scores ? JSON.parse(newPack.scores as string) : {},
    grades: newPack.grades ? JSON.parse(newPack.grades as string) : {},
    total_weight: packRepository.computeTotalWeight(newPack),
    favorites_count: packRepository.computeFavouritesCount(newPack),
    total_score: packRepository.computeTotalScores(newPack),
    items: newPack.itemPacks.map((itemPack) => itemPack.item),
  };
};
