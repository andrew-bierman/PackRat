import { count, eq } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { item } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class Item {
  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance;
  }

  async update(
    data: any,
    id: string,
    filter = eq(item.id, id),
    returning = null,
  ) {
    return (await this.createInstance())
      .update(item)
      .set(data)
      .where(filter)
      .returning(returning)
      .get();
  }

  async delete(id: string, filter = eq(item.id, id)) {
    return (await this.createInstance())
      .delete(item)
      .where(filter)
      .returning()
      .get();
  }

  async findById(id: string, filter = eq(item.id, id)) {
    return (await this.createInstance())
      .select()
      .from(item)
      .where(filter)
      .limit(1)
      .get();
  }

  async findMany(filter = null) {
    return (await this.createInstance())
      .select()
      .from(item)
      .where(filter)
      .get();
  }

  async findUniqueItem(query) {
    return (await this.createInstance()).query.item.findFirst(query);
  }

  async create(data: any) {
    return (await this.createInstance())
      .insert(item)
      .values(data)
      .returning()
      .get();
  }

  async count() {
    return (await this.createInstance())
      .select({ count: count() })
      .from(item)
      .where(eq(item.global, true))
      .get();
  }
}
