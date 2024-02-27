import { eq } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { node } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class Node {
  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance;
  }

  async update(
    data: any,
    id: string,
    filter = eq(node.id, id),
    returning = null,
  ) {
    return (await this.createInstance())
      .update(node)
      .set(data)
      .where(filter)
      .returning(returning)
      .get();
  }

  async delete(id: string, filter = eq(node.id, id)) {
    return (await this.createInstance())
      .delete(node)
      .where(filter)
      .returning()
      .get();
  }

  async findById(id: string, filter = eq(node.id, id)) {
    return (await this.createInstance())
      .select()
      .from(node)
      .where(filter)
      .limit(1)
      .get();
  }

  async findMany(filter = null) {
    return (await this.createInstance())
      .select()
      .from(node)
      .where(filter)
      .get();
  }

  async findUniqueNode(query) {
    return (await this.createInstance()).query.node.findFirst(query);
  }

  async create(data: any) {
    return (await this.createInstance())
      .insert(node)
      .values(data)
      .returning()
      .get();
  }
}
