import { eq } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { InsertTripGeoJson, InsertTrip, trip as TripTable, tripGeojsons } from '../../db/schema';
import { getDB } from '../../trpc/context';

export class Trip {

  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance
  }


  async getTripById(id: string) {
    return await (await this.createInstance())
      .select()
      .from(TripTable)
      .where(eq(TripTable.id, id))
      .limit(1)
      .get();
  }

  async updateTrip(trip: Partial<InsertTrip>) {
    return await (await this.createInstance())
      .update(TripTable)
      .set(trip)
      .where(eq(TripTable.id, trip.id))
      .returning()
      .get();
  }

  async create(trip: InsertTrip) {
    return await (await this.createInstance()).insert(TripTable).values(trip).returning().get();
  }

  async delete(id: string, filter = eq(TripTable.id, id)) {
    return await (await this.createInstance()).delete(TripTable).where(filter).returning().get();
  }

  async findById(id: string, filter = eq(TripTable.id, id)) {
    return await (await this.createInstance())
      .select()
      .from(TripTable)
      .where(filter)
      .limit(1)
      .get();
  }

  async findMany(filter = null) {
    return await (await this.createInstance()).select().from(TripTable).where(filter).get();
  }

  async update(data: any, id: string, filter = eq(TripTable.id, id), returning = null) {
    return (await this.createInstance()).update(TripTable).set(data).where(filter).returning(returning).get();
  }

  async findUnique(filter = null) {
    return await (await this.createInstance())
      .select()
      .from(TripTable)
      .where(filter)
      .limit(1)
      .get();
  }

}
export class TripGeoJson {
  async createInstance() {
    const dbInstance = await createDb(getDB());
    return dbInstance
  }
  async create(tripGeoJson: InsertTripGeoJson) {
    return await (await this.createInstance()).insert(tripGeojsons).values(tripGeoJson).returning().get();
  }
}
