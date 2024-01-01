import { count, eq } from "drizzle-orm";
import { createDb } from "../../db/client";
import { item } from "../../db/schema";
import { getDB } from "../../trpc/context";

export class Item {
    private dbInstance;

    constructor() {
        this.dbInstance = createDb(getDB());
    }

    async update(data: any, id: string, filter = eq(item.id, id), returning = null) {
        return this.dbInstance.update(item)
            .set(data)
            .where(filter)
            .returning(returning)
            .get();
    }

    async delete(id: string, filter = eq(item.id, id)) {
        return this.dbInstance.delete(item)
            .where(filter)
            .returning()
            .get();
    }

    async findById(id: string, filter = eq(item.id, id)) {
        return this.dbInstance.select()
            .from(item)
            .where(filter)
            .limit(1)
            .get();
    }

    async findMany(filter = null) {
        return this.dbInstance.select()
            .from(item)
            .where(filter)
            .get();
    }

    async findUniqueItem(query) {
        return this.dbInstance.query.item.findFirst(query);
    }

    async create(data: any) {
        return this.dbInstance.insert(item)
            .values(data)
            .returning()
            .get();
    }

    async count() {
        return this.dbInstance.select({ count: count() })
            .from(item)
            .where(eq(item.global, true))
            .get();
    }
}
