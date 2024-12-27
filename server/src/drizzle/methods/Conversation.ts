import { and, eq } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { conversation as ConversationTable } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class Conversation {
  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance;
  }

  async update(data: any, filter = eq(ConversationTable.id, data.id)) {
    try {
      const updatedConversation = (await this.createInstance())
        .update(ConversationTable)
        .set(data)
        .where(filter)
        .returning()
        .get();
      return updatedConversation;
    } catch (error) {
      throw new Error(`Failed to update the conversation: ${error.message}`);
    }
  }

  async delete(id: string, filter = eq(ConversationTable.id, id)) {
    try {
      return (await this.createInstance())
        .delete(ConversationTable)
        .where(filter)
        .returning()
        .get();
    } catch (error) {
      throw new Error(`Failed to delete the conversation: ${error.message}`);
    }
  }

  async findMany(userId?: string) {
    try {
      const conversations = (
        await this.createInstance()
      ).query.conversation.findMany({
        ...(userId && { where: eq(ConversationTable.userId, userId) }),
      });
      return conversations;
    } catch (error) {
      throw new Error(`Failed to find conversations: ${error.message}`);
    }
  }

  async findConversation({
    userId,
    itemTypeId,
  }: {
    userId: string;
    itemTypeId: string;
  }) {
    try {
      const filter = and(
        eq(ConversationTable.userId, userId),
        eq(ConversationTable.itemTypeId, itemTypeId),
      );
      const conversation = (await this.createInstance())
        .select()
        .from(ConversationTable)
        .where(filter)
        .get();
      if (!conversation) return null;
      return conversation;
    } catch (error) {
      throw new Error(`Failed to find conversation: ${error.message}`);
    }
  }

  async create(data: any) {
    try {
      const conversation = (await this.createInstance())
        .insert(ConversationTable)
        .values(data)
        .returning()
        .get();
      return conversation;
    } catch (error) {
      throw new Error(`Failed to create conversation: ${error.message}`);
    }
  }
}
