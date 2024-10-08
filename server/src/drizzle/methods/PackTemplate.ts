import { eq, like } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import { convertWeight, type WeightUnit } from 'src/utils/convertWeight';
import { packTemplate as packTemplateTable } from 'src/db/schema';

export type Filter = {
  searchQuery?: string;
};

export class PackTemplate {
  async findMany(filter?: Filter) {
    const packTemplates = await DbClient.instance.query.packTemplate.findMany({
      with: {
        itemPackTemplates: {
          with: {
            item: {},
          },
        },
      },
      ...(filter?.searchQuery
        ? { where: like(packTemplateTable.name, `%${filter.searchQuery}%`) }
        : {}),
    });

    return packTemplates.map((packTemplate) => {
      const items = packTemplate.itemPackTemplates.map(
        (itemPack) => itemPack.item,
      );
      const total_weight = items.reduce((sum, item) => {
        const weightInGrams = convertWeight(
          item.weight,
          item.unit as WeightUnit,
          'g',
        );
        return sum + weightInGrams * item.quantity;
      }, 0);
      const quantity = items.reduce((sum, item) => sum + item.quantity, 0);

      delete packTemplate.itemPackTemplates;

      return {
        ...packTemplate,
        items,
        total_weight,
        quantity,
      };
    });
  }

  async findPackTemplate(id: string) {
    const packTemplate = await DbClient.instance.query.packTemplate.findFirst({
      where: eq(packTemplateTable.id, id),
      with: {
        itemPackTemplates: { with: { item: { with: { category: {} } } } },
      },
    });

    const items = packTemplate.itemPackTemplates.map(
      (itemPackTemplate) => itemPackTemplate.item,
    );
    const total_weight = items.reduce((sum, item) => {
      const weightInGrams = convertWeight(
        item.weight,
        item.unit as WeightUnit,
        'g',
      );
      return sum + weightInGrams * item.quantity;
    }, 0);
    const quantity = items.reduce((sum, item) => sum + item.quantity, 0);

    delete packTemplate.itemPackTemplates;

    return {
      ...packTemplate,
      items,
      total_weight,
      quantity,
    };
  }
}
