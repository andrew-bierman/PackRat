import { asc, count, desc, eq, like, sql } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import { convertWeight, type WeightUnit } from 'src/utils/convertWeight';
import { packTemplate, item, itemPackTemplates } from 'src/db/schema';
import { PaginationParams } from 'src/helpers/pagination';

export type Filter = {
  searchQuery?: string;
};

export type ORDER_BY = 'Lightest' | 'Heaviest';

export class PackTemplate {
  async findMany({
    filter,
    orderBy,
    pagination,
  }: {
    filter?: Filter;
    orderBy?: ORDER_BY;
    pagination: PaginationParams;
  }) {
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

    const totalCountResult = await DbClient.instance
      .select({ count: count() })
      .from(query.as('pack_templates'))
      .all();

    const data = await query
      .offset(pagination.offset)
      .limit(pagination.limit)
      .all();

    return {
      data,
      totalCount: totalCountResult[0].count,
    };
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
