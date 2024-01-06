import { eq } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { pack } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class Pack {
  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance;
  }

  async update(
    data: any,
    id: string,
    filter = eq(pack.id, id),
    returning = null,
  ) {
    return (await this.createInstance())
      .update(pack)
      .set(data)
      .where(filter)
      .returning(returning)
      .get();
  }

  async delete(id: string, filter = eq(pack.id, id)) {
    return (await this.createInstance())
      .delete(pack)
      .where(filter)
      .returning()
      .get();
  }

  async findById(id: string, filter = eq(pack.id, id)) {
    return (await this.createInstance())
      .select()
      .from(pack)
      .where(filter)
      .limit(1)
      .get();
  }

  async findMany(filter = null) {
    return (await this.createInstance())
      .select()
      .from(pack)
      .where(filter)
      .get();
  }

  async findUniquepack(query) {
    const pack = (await this.createInstance()).query.pack.findFirst(query);
    return pack;
  }
}
