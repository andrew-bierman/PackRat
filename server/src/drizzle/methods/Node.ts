import { eq } from "drizzle-orm";
import { createDb } from "../../db/client";
import { node } from "../../db/schema";

export class Node {
    private dbInstance;

    constructor() {
        this.dbInstance = createDb(db);
    }

    async update(data: any, id: string, filter = eq(node.id, id), returning = null) {
        return this.dbInstance.update(node)
            .set(data)
            .where(filter)
            .returning(returning)
            .get();
    }

    async delete(id: string, filter = eq(node.id, id)) {
        return this.dbInstance.delete(node)
            .where(filter)
            .returning()
            .get();
    }

    async findById(id: string, filter = eq(node.id, id)) {
        return this.dbInstance.select()
            .from(node)
            .where(filter)
            .limit(1)
            .get();
    }

    async findMany(filter = null) {
        return this.dbInstance.select()
            .from(node)
            .where(filter)
            .get();
    }

    async findUniqueNode(query) {
        return this.dbInstance.query.node.findFirst(query);
    }

    async create(data: any) {
        return this.dbInstance.insert(node)
            .values(data)
            .returning()
            .get();
    }
}
