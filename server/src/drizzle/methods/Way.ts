import { eq } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import { way } from '../../db/schema';

export class Way {
  async update(
    data: any,
    id: string,
    filter = eq(way.id, id),
    returning = null,
  ) {
    return DbClient.instance
      .update(way)
      .set(data)
      .where(filter)
      .returning(returning)
      .get();
  }

  async delete(id: string, filter = eq(way.id, id)) {
    return DbClient.instance.delete(way).where(filter).returning().get();
  }

  async findById(id: string, filter = eq(way.id, id)) {
    return DbClient.instance.select().from(way).where(filter).limit(1).get();
  }

  async findMany(filter = null) {
    return DbClient.instance.select().from(way).where(filter).get();
  }

  async findUniqueWay(query) {
    return DbClient.instance.query.way.findFirst(query);
  }

  async create(data: any) {
    return DbClient.instance.insert(way).values(data).returning().get();
  }
}
