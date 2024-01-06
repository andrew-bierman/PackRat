import { eq } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { way } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class Way {
  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance;
  }

  async update(
    data: any,
    id: string,
    filter = eq(way.id, id),
    returning = null,
  ) {
    return (await this.createInstance())
      .update(way)
      .set(data)
      .where(filter)
      .returning(returning)
      .get();
  }

  async delete(id: string, filter = eq(way.id, id)) {
    return (await this.createInstance())
      .delete(way)
      .where(filter)
      .returning()
      .get();
  }

  async findById(id: string, filter = eq(way.id, id)) {
    return (await this.createInstance())
      .select()
      .from(way)
      .where(filter)
      .limit(1)
      .get();
  }

  async findMany(filter = null) {
    return (await this.createInstance()).select().from(way).where(filter).get();
  }

  async findUniqueWay(query) {
    return (await this.createInstance()).query.way.findFirst(query);
  }

  async create(data: any) {
    return (await this.createInstance())
      .insert(way)
      .values(data)
      .returning()
      .get();
  }
}
