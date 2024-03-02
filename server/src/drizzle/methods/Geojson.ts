import { createDb } from '../../db/client';
import { type InsertGeoJson, geojson as GeoJsonTable } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class GeoJson {
  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance;
  }

  async create(data: InsertGeoJson) {
    try {
      const geojson = (await this.createInstance())
        .insert(GeoJsonTable)
        .values(data)
        .returning()
        .get();
      return geojson;
    } catch (error) {
      throw new Error(`Failed to create geojson record: ${error.message}`);
    }
  }
}
