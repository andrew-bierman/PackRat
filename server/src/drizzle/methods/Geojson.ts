import { DbClient } from '../../db/client';
import { type InsertGeoJson, geojson } from '../../db/schema';

export class GeoJson {
  async create(geoJSONData: InsertGeoJson) {
    try {
      const db = DbClient.instance;
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
