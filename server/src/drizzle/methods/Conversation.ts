import { eq } from "drizzle-orm";
import { createDb } from "../../db/client";
import { conversation } from "../../db/schema";
import { getDB } from "../../trpc/context";

export class Conversation {
    private dbInstance;

    constructor() {
        this.dbInstance = createDb(getDB());
    }

    async update(data: any, id: string, filter = eq(conversation.id, id), returning = null) {
        return this.dbInstance.update(conversation)
            .set(data)
            .where(filter)
            .returning(returning)
            .get();
    }

    async delete(id: string, filter = eq(conversation.id, id)) {
        return this.dbInstance.delete(conversation)
            .where(filter)
            .returning()
            .get();
    }

    async findById(id: string, filter = eq(conversation.id, id)) {
        return this.dbInstance.select()
            .from(conversation)
            .where(filter)
            .limit(1)
            .get();
    }

    async findMany(filter = null) {
        return this.dbInstance.select()
            .from(conversation)
            .where(filter)
            .get();
    }

    async findUniqueConversation(query) {
        return this.dbInstance.query.conversation.findFirst(query);
    }

    async create(data: any) {
        return this.dbInstance.insert(conversation)
            .values(data)
            .returning()
            .get();
    }
}
