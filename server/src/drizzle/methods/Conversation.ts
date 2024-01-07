import { eq } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { conversation } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class Conversation {
  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance;
  }

  async update(
    data: any,
    id: string,
    filter = eq(conversation.id, id),
    returning = null,
  ) {
    return (await this.createInstance())
      .update(conversation)
      .set(data)
      .where(filter)
      .returning(returning)
      .get();
  }

  async delete(id: string, filter = eq(conversation.id, id)) {
    return (await this.createInstance())
      .delete(conversation)
      .where(filter)
      .returning()
      .get();
  }

  async findById(id: string, filter = eq(conversation.id, id)) {
    return (await this.createInstance())
      .select()
      .from(conversation)
      .where(filter)
      .limit(1)
      .get();
  }

  async findMany(filter = null) {
    return (await this.createInstance())
      .select()
      .from(conversation)
      .where(filter)
      .get();
  }

  async findUniqueConversation(query) {
    return (await this.createInstance()).query.conversation.findFirst(query);
  }

  async create(data: any) {
    return (await this.createInstance())
      .insert(conversation)
      .values(data)
      .returning()
      .get();
  }
}
