import { asc, count, desc, eq, like, sql } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import { convertWeight, type WeightUnit } from 'src/utils/convertWeight';
import {
  packTemplate,
  item,
  itemPackTemplate,
  InsertPackTemplate,
} from 'src/db/schema';
import { PaginationParams } from 'src/helpers/pagination';

export interface Filter {
  searchQuery?: string;
}

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
        total_weight:
          sql`SUM(${item.weight} * ${itemPackTemplate.quantity})`.as(
            'total_weight',
          ),
        quantity: sql`SUM(${itemPackTemplate.quantity})`,
      })
      .from(packTemplate)
      .leftJoin(
        itemPackTemplate,
        eq(packTemplate.id, itemPackTemplate.packTemplateId),
      )
      .leftJoin(item, eq(itemPackTemplate.itemId, item.id))
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

  /**
   * Creates a pack template.
   * @param data The date used to create a pack template.
   */
  async create(data: InsertPackTemplate) {
    try {
      const createdPackTemplate = await DbClient.instance
        .insert(packTemplate)
        .values(data)
        .returning()
        .get();
      return createdPackTemplate;
    } catch (error) {
      throw new Error(`Failed to create a pack: ${error.message}`);
    }
  }

  /**
   * Finds a pack template by its ID or name.
   * @param params The parameters to search for a pack template.
   * @param params.id The ID of the pack template to search for.
   * @param params.name The name of the pack template to search for.
   * @returns
   */
  async findPackTemplate(
    params: { id: string; name?: undefined } | { name: string; id?: undefined },
  ) {
    const { id, name } = params;
    let filter;
    if (id) {
      filter = eq(packTemplate.id, id);
    } else if (name) {
      filter = eq(packTemplate.name, name);
    } else {
      throw new Error('Either id or name must be provided');
    }
    const packTemplateResult =
      await DbClient.instance.query.packTemplate.findFirst({
        where: filter,
        with: {
          itemPackTemplates: { with: { item: { with: { category: {} } } } },
        },
      });

    if (!packTemplateResult) {
      return packTemplateResult;
    }

    const items = packTemplateResult.itemPackTemplates.map(
      (itemPackTemplate) => ({
        ...itemPackTemplate.item,
        quantity: itemPackTemplate.quantity,
      }),
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
      itemsPackTemplate: items,
      total_weight,
      quantity,
    };
  }
}
