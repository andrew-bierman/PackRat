import { count, eq } from "drizzle-orm";
import { createDb } from "../../db/client";
import { way } from "../../db/schema";

export class Way {
    async update(data: any, id: string, filter = eq(way.id, id), returning = null) {
        return await createDb(db).update(way).set(data).where(filter).returning(returning).get();
    }

    async delete(id: string, filter = eq(way.id, id)) {
        return await createDb(db).delete(way).where(filter).returning().get();
    }

    async findById(id: string, filter = eq(way.id, id)) {
        return await createDb(db).select().from(way).where(filter).limit(1).get();
    }

    async findMany(filter = null) {
        return await createDb(db).select().from(way).where(filter).get();
    }

    async findUniqueway(query) {
        const way = await createDb(db).query.way.findFirst(query)
        return way
    }

    async create(data: any) {
        return await createDb(db).insert(way).values(data).returning().get();
    }

}