import { eq } from "drizzle-orm";
import { createDb } from "../../db/client";
import { pack } from "../../db/schema";
import { convertWeight } from '../../utils/convertWeight';

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

    async computeTotalWeight(pack) {
        if (pack.itemDocuments && pack.itemDocuments.length > 0) {
            const totalWeight = pack.itemDocuments.reduce(
                (total, itemDocument: any) => {
                    const weightInGrams = convertWeight(
                        itemDocument.weight,
                        itemDocument.unit,
                        'g',
                    );
                    return total + weightInGrams * itemDocument.quantity;
                },
                0,
            );
            return {
                ...pack,
                total_weight: totalWeight,
            };
        } else {
            return {
                ...pack,
                total_weight: 0,
            };
        }
    };


    async computeFavouritesCount(pack) {
        return {
            ...pack,
            favorites_count: pack.favorited_by?.length ?? 0,
        }
    }

    async computeTotalScores(pack) {
        if (!pack.scores) return { ...pack, total_score: 0 };

        const scoresArray: number[] = Object.values(pack.scores);
        const sum: number = scoresArray.reduce(
            (total: number, score: number) => total + score,
            0,
        );
        const average: number = scoresArray.length > 0 ? sum / scoresArray.length : 0;

        return { ...pack, total_score: Math.round(average * 100) / 100 };
    };
}
