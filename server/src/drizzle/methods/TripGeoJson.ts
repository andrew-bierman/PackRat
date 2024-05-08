import { DbClient } from '../../db/client';
import { type InsertTripGeoJson, tripGeojsons } from '../../db/schema';

export class TripGeoJson {
  async create(tripGeoJson: InsertTripGeoJson) {
    try {
      const record = await DbClient.instance
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
