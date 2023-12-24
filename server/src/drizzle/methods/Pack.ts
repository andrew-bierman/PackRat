import { eq } from "drizzle-orm";
import { createDb } from "../../db/client";
import { pack } from "../../db/schema";

export class Pack {
    async update(data: any, id: string, filter = eq(pack.id, id), returning = null) {
        return await createDb(db).update(pack).set(data).where(filter).returning(returning).get();
    }

    async delete(id: string, filter = eq(pack.id, id)) {
        return await createDb(db).delete(pack).where(filter).returning().get();
    }

    async findById(id: string, filter = eq(pack.id, id)) {
        return await createDb(db).select().from(pack).where(filter).limit(1).get();
    }

    async findMany(filter = null) {
        return await createDb(db).select().from(pack).where(filter).get();
    }

    async findUniquepack(query) {
        const pack = await createDb(db).query.pack.findFirst(query)
        return pack
    }
}