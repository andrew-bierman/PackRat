import { createDb } from '../../db/client';
import { type InsertTripGeoJson, tripGeojsons } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class TripGeoJson {
  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance;
  }

  async create(tripGeoJson: InsertTripGeoJson) {
    try {
      const record = (await this.createInstance())
        .insert(tripGeojsons)
        .values(tripGeoJson)
        .returning()
        .get();
      return record;
    } catch (error) {
      throw new Error(`Failed to create trip geojson record: ${error.message}`);
    }
  }
}
