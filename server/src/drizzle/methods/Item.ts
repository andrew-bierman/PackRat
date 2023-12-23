import { eq } from "drizzle-orm";
import { createDb } from "../../db/client";
import { item } from "../../db/schema";

export class Item {
    async update(data: any, id: string, filter = eq(item.id, id), returning = null) {
        return await createDb(db).update(item).set(data).where(filter).returning(returning).get();
    }

    async delete(id: string, filter = eq(item.id, id)) {
        return await createDb(db).delete(item).where(filter).returning().get();
    }

    async findById(id: string, filter = eq(item.id, id)) {
        return await createDb(db).select().from(item).where(filter).limit(1).get();
    }

    async findMany(filter = null) {
        return await createDb(db).select().from(item).where(filter).get();
    }

    async findUniqueItem(query) {
        const item = await createDb(db).query.item.findFirst(query)
        return item
    }

    async create(data: any) {
        return await createDb(db).insert(item).values(data).returning().get();
    }

}