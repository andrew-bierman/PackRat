import { count, eq } from "drizzle-orm";
import { createDb } from "../../db/client";
import { conversation } from "../../db/schema";

export class Conversation {
    async update(data: any, id: string, filter = eq(conversation.id, id), returning = null) {
        return await createDb(db).update(conversation).set(data).where(filter).returning(returning).get();
    }

    async delete(id: string, filter = eq(conversation.id, id)) {
        return await createDb(db).delete(conversation).where(filter).returning().get();
    }

    async findById(id: string, filter = eq(conversation.id, id)) {
        return await createDb(db).select().from(conversation).where(filter).limit(1).get();
    }

    async findMany(filter = null) {
        return await createDb(db).select().from(conversation).where(filter).get();
    }

    async findUniqueConversation(query) {
        const conversation = await createDb(db).query.conversation.findFirst(query)
        return conversation
    }

    async create(data: any) {
        return await createDb(db).insert(conversation).values(data).returning().get();
    }

}