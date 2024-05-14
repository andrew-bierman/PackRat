import { eq } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import { node } from '../../db/schema';

export class Node {
  async update(
    data: any,
    id: string,
    filter = eq(node.id, id),
    returning = null,
  ) {
    return DbClient.instance
      .update(node)
      .set(data)
      .where(filter)
      .returning(returning)
      .get();
  }

  async delete(id: string, filter = eq(node.id, id)) {
    return DbClient.instance.delete(node).where(filter).returning().get();
  }

  async findById(id: string, filter = eq(node.id, id)) {
    return DbClient.instance.select().from(node).where(filter).limit(1).get();
  }

  async findMany(filter = null) {
    return DbClient.instance.select().from(node).where(filter).get();
  }

  async findUniqueNode(query) {
    return DbClient.instance.query.node.findFirst(query);
  }

  async create(data: any) {
    return DbClient.instance.insert(node).values(data).returning().get();
  }
}
