import { asc, desc, eq, like, sql } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import { convertWeight, type WeightUnit } from 'src/utils/convertWeight';
import { packTemplate, item, itemPackTemplates } from 'src/db/schema';

export type Filter = {
  searchQuery?: string;
};

export type ORDER_BY = 'Lightest' | 'Heaviest';

export class PackTemplate {
  async findMany({ filter, orderBy }: { filter?: Filter; orderBy?: ORDER_BY }) {
    const query = DbClient.instance
      .select({
        id: packTemplate.id,
        name: packTemplate.name,
        type: packTemplate.type,
        description: packTemplate.description,
        total_weight: sql`SUM(${item.weight} * ${item.quantity})`.as(
          'total_weight',
        ),
        quantity: sql`SUM(${item.quantity})`,
      })
      .from(packTemplate)
      .leftJoin(
        itemPackTemplates,
        eq(packTemplate.id, itemPackTemplates.packTemplateId),
      )
      .leftJoin(item, eq(itemPackTemplates.itemId, item.id))
      .groupBy(packTemplate.id);

    if (filter?.searchQuery) {
      query.where(like(packTemplate.name, `%${filter.searchQuery}%`));
    }

    if (orderBy) {
      query.orderBy(
        orderBy === 'Lightest'
          ? asc(sql`total_weight`)
          : desc(sql`total_weight`),
      );
    }

    return await query.all();
  }

  async findPackTemplate(id: string) {
    const packTemplateResult =
      await DbClient.instance.query.packTemplate.findFirst({
        where: eq(packTemplate.id, id),
        with: {
          itemPackTemplates: { with: { item: { with: { category: {} } } } },
        },
      });

    const items = packTemplateResult.itemPackTemplates.map(
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

    delete packTemplateResult.itemPackTemplates;

    return {
      ...packTemplateResult,
      items,
      total_weight,
      quantity,
    };
  }
}
