import { createDb } from '../../db/client';
import { type InsertGeoJson, geojson } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class GeoJson {
  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance;
  }

  async create(geoJSONData: InsertGeoJson) {
    try {
      const db = await this.createInstance();
      const record = await db
        .insert(geojson)
        .values(geoJSONData)
        .returning()
        .get();
      return record;
    } catch (error) {
      throw new Error(`Failed to create geojson record: ${error.message}`);
    }
  }
}
