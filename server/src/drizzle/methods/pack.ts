import { eq } from "drizzle-orm";
import { createDb } from "../../db/client";
import { pack } from "../../db/schema";

export class Pack {
    private dbInstance;

    constructor() {
        this.dbInstance = createDb(db);
    }

    async update(data: any, id: string, filter = eq(pack.id, id), returning = null) {
        return this.dbInstance.update(pack)
            .set(data)
            .where(filter)
            .returning(returning)
            .get();
    }

    async delete(id: string, filter = eq(pack.id, id)) {
        return this.dbInstance.delete(pack)
            .where(filter)
            .returning()
            .get();
    }

    async findById(id: string, filter = eq(pack.id, id)) {
        return this.dbInstance.select()
            .from(pack)
            .where(filter)
            .limit(1)
            .get();
    }

    async findMany(filter = null) {
        return this.dbInstance.select()
            .from(pack)
            .where(filter)
            .get();
    }

    async findUniquePack(query) {
        // Assuming findFirst is a valid method on the query object for the pack
        return this.dbInstance.query.pack.findFirst(query);
    }

    async create(data: any) {
        return this.dbInstance.insert(pack)
            .values(data)
            .returning()
            .get();
    }
}
