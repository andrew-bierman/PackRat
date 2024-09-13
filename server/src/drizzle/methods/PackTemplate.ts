import { eq } from 'drizzle-orm';
import { DbClient } from 'src/db/client';
import { convertWeight, type WeightUnit } from 'src/utils/convertWeight';
import { packTemplate as packTemplateTable } from 'src/db/schema';

export class PackTemplate {
  async findMany() {
    const packTemplates = await DbClient.instance.query.packTemplate.findMany({
      with: {
        itemPackTemplates: {
          with: {
            item: {},
          },
        },
      },
    });

    return packTemplates.map((packTemplate) => {
      // ...packTemplate,
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
      with: { itemPackTemplates: { with: { item: {} } } },
    });

    // TODO (pack-templates) - tackle duplication?
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
  }
}
