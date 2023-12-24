import { eq } from 'drizzle-orm';
import { createDb } from '../../db/client';
import { InsertTrip, trip as TripTable, UpdateTrip } from '../../db/schema';

export class Trip {
  constructor( ) {}
  private getDB() {
    return createDb(this.db);
  }
  async getTripById(id: string) {
    return await this.getDB()
      .select()
      .from(TripTable)
      .where(eq(TripTable.id, id))
      .limit(1)
      .get();
  }
  
  async updateTrip(trip: UpdateTrip) {
    return await this.getDB()
      .update(TripTable)
      .set(trip)
      .where(eq(TripTable.id, trip.id))
      .returning()
      .get();
  }

  async create(trip: InsertTrip) {
    return await this.getDB().insert(TripTable).values(trip).returning().get();
  }

  async delete(id: string, filter = eq(TripTable.id, id)) {
    return await this.getDB().delete(TripTable).where(filter).returning().get();
  }

  async findById(id: string, filter = eq(TripTable.id, id)) {
    return await this.getDB()
      .select()
      .from(TripTable)
      .where(filter)
      .limit(1)
      .get();
  }

  async findMany(filter = null) {
    return await this.getDB().select().from(TripTable).where(filter).get();
  }
}
