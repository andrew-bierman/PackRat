import { count, eq } from "drizzle-orm";
import { createDb } from "../../db/client";
import { node } from "../../db/schema";

export class Node {
    async update(data: any, id: string, filter = eq(node.id, id), returning = null) {
        return await createDb(db).update(node).set(data).where(filter).returning(returning).get();
    }

    async delete(id: string, filter = eq(node.id, id)) {
        return await createDb(db).delete(node).where(filter).returning().get();
    }

    async findById(id: string, filter = eq(node.id, id)) {
        return await createDb(db).select().from(node).where(filter).limit(1).get();
    }

    async findMany(filter = null) {
        return await createDb(db).select().from(node).where(filter).get();
    }

    async findUniqueNode(query) {
        const node = await createDb(db).query.node.findFirst(query)
        return node
    }

    async create(data: any) {
        return await createDb(db).insert(node).values(data).returning().get();
    }
}