import { DbClient } from '../../db/client';
import { and, count, eq, like, sql } from 'drizzle-orm';
import { itemImage as itemImageTable } from '../../db/schema';

export class ItemImages {
    async create(data: any) {
        try {
        const itemImage = await DbClient.instance
            .insert(itemImageTable)
            .values(data)
            .returning()
            .get();
    
        return itemImage;
        } catch (error) {
        throw new Error(`Failed to create item image: ${error.message}`);
        }
    }
    
    async createBulk(data: any[]) {
        try {
        const insertedItemImages = [];
        for (const itemImageData of data) {
            const itemImage = await DbClient.instance
            .insert(itemImageTable)
            .values(itemImageData)
            .returning()
            .get();
            insertedItemImages.push(itemImage);
        }
        return insertedItemImages;
        } catch (error) {
        throw new Error(`Failed to create item images: ${error.message}`);
        }
    }
    
    async update(
        id: string,
        data: Partial<any>,
        filter = eq(itemImageTable.id, id),
    ) {
        try {
        const itemImage = await DbClient.instance
            .update(itemImageTable)
            .set(data)
            .where(filter)
            .returning()
            .get();
    
        return itemImage;
        } catch (error) {
        throw new Error(`Failed to update item image: ${error.message}`);
        }
    }
    
    async delete(id: string) {
        try {
        await DbClient.instance.delete(itemImageTable).where(eq(itemImageTable.id, id)).execute();
        } catch (error) {
        throw new Error(`Failed to delete item image: ${error.message}`);
        }
    }
    
    async getById(id: string) {
        try {
        const itemImage = await DbClient.instance
            .select()
            .from(itemImageTable)
            .where(eq(itemImageTable.id, id))
            .get();
    
        return itemImage;
        } catch (error) {
        throw new Error(`Failed to get item image: ${error.message}`);
        }
    }
    // get all images for an item
    async getByItemId({itemId}: {itemId: string}) {
        try {
        const itemImages = await DbClient.instance
            .select()
            .from(itemImageTable)
            .where(eq(itemImageTable.itemId, itemId))
            .all();
    
        return itemImages;
        } catch (error) {
        throw new Error(`Failed to get item images: ${error.message}`);
        }
    } 
}