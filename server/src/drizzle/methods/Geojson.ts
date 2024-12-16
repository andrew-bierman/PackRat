import { eq } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import { type InsertGeoJson, geojson } from '../../db/schema';

export class GeoJson {
  async create(geoJSON: InsertGeoJson) {
    try {
      const db = DbClient.instance;
      const record = await db.insert(geojson).values(geoJSON).returning().get();
      return record;
    } catch (error) {
      throw new Error(`Failed to create geojson record: ${error.message}`);
    }
  }

  async update(
    id: string,
    data: Partial<InsertGeoJson>,
    filter = eq(geojson.id, id),
  ) {
    try {
      const geojsonValue = await DbClient.instance
        .update(geojson)
        .set(data)
        .where(filter)
        .returning()
        .get();

      return geojsonValue;
    } catch (error) {
      throw new Error(`Failed to geojson record: ${error.message}`);
    }
  }
}
