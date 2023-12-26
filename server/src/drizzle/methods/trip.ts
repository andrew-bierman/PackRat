import { eq } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { InsertTripGeoJson, InsertTrip, trip as TripTable, tripGeojsons  } from '../../db/schema';

export class Trip {
  private dbInstance;

    constructor() {
        this.dbInstance = createDb(db);
    }

  async getTripById(id: string) {
    return await this.dbInstance
      .select()
      .from(TripTable)
      .where(eq(TripTable.id, id))
      .limit(1)
      .get();
  }
  
  async updateTrip(trip: Partial<InsertTrip>) {
    return await this.dbInstance
      .update(TripTable)
      .set(trip)
      .where(eq(TripTable.id, trip.id))
      .returning()
      .get();
  }

  async create(trip: InsertTrip) {
    return await this.dbInstance.insert(TripTable).values(trip).returning().get();
  }

  async delete(id: string, filter = eq(TripTable.id, id)) {
    return await this.dbInstance.delete(TripTable).where(filter).returning().get();
  }

  async findById(id: string, filter = eq(TripTable.id, id)) {
    return await this.dbInstance
      .select()
      .from(TripTable)
      .where(filter)
      .limit(1)
      .get();
  }

  async findMany(filter = null) {
    return await this.dbInstance.select().from(TripTable).where(filter).get();
  }
}
export class TripGeoJson {
  private dbInstance;

    constructor() {
        this.dbInstance = createDb(db);
    }
  async create(tripGeoJson: InsertTripGeoJson) {
    return await this.dbInstance.insert(tripGeojsons).values(tripGeoJson).returning().get();
  }
}
