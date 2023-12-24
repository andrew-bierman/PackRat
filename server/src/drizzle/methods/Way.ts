import { eq } from "drizzle-orm";
import { createDb } from "../../db/client";
import { way } from "../../db/schema";

export class Way {
    private dbInstance;

    constructor() {
        this.dbInstance = createDb(db);
    }

    async update(data: any, id: string, filter = eq(way.id, id), returning = null) {
        return this.dbInstance.update(way)
            .set(data)
            .where(filter)
            .returning(returning)
            .get();
    }

    async delete(id: string, filter = eq(way.id, id)) {
        return this.dbInstance.delete(way)
            .where(filter)
            .returning()
            .get();
    }

    async findById(id: string, filter = eq(way.id, id)) {
        return this.dbInstance.select()
            .from(way)
            .where(filter)
            .limit(1)
            .get();
    }

    async findMany(filter = null) {
        return this.dbInstance.select()
            .from(way)
            .where(filter)
            .get();
    }

    async findUniqueWay(query) {
        return this.dbInstance.query.way.findFirst(query);
    }

    async create(data: any) {
        return this.dbInstance.insert(way)
            .values(data)
            .returning()
            .get();
    }
}
