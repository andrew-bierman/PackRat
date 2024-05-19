import { eq } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import {
  type InsertTripImage,
  tripImages as TripImagesTable,
} from '../../db/schema';

export class TripImage {
  async create(tripImage: InsertTripImage) {
    try {
      const createdTrip = await DbClient.instance
        .insert(TripImagesTable)
        .values(tripImage)
        .returning()
        .get();
      return createdTrip;
    } catch (error) {
      throw new Error(`Failed to upload a trip image: ${error.message}`);
    }
  }

  async delete(id: string, filter = eq(TripImagesTable.id, id)) {
    try {
      const deletedTrip = await DbClient.instance
        .delete(TripImagesTable)
        .where(filter)
        .returning()
        .get();
      return deletedTrip;
    } catch (error) {
      throw new Error(`Failed to delete trip image: ${error.message}`);
    }
  }
}
