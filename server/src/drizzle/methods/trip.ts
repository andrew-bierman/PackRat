import { eq } from 'drizzle-orm';
import { DbClient } from '../../db/client';
import { type InsertTrip, trip as TripTable } from '../../db/schema';

export class Trip {
  async update(trip: Partial<InsertTrip>) {
    try {
      if (!trip.id) {
        throw new Error('Trip id is required for update operation');
      }
      const updatedTrip = await DbClient.instance
        .update(TripTable)
        .set(trip)
        .where(eq(TripTable.id, trip.id))
        .returning()
        .get();
      return updatedTrip;
    } catch (error) {
      throw new Error(`Failed to update trip: ${error.message}`);
    }
  }

  async create(trip: InsertTrip) {
    try {
      const createdTrip = await DbClient.instance
        .insert(TripTable)
        .values(trip)
        .returning()
        .get();
      return createdTrip;
    } catch (error) {
      throw new Error(`Failed to create new trip: ${error.message}`);
    }
  }

  async delete(id: string, filter = eq(TripTable.id, id)) {
    try {
      const deletedTrip = await DbClient.instance
        .delete(TripTable)
        .where(filter)
        .returning()
        .get();
      return deletedTrip;
    } catch (error) {
      throw new Error(`Failed to delete trip: ${error.message}`);
    }
  }

  async findById(id: string) {
    try {
      const trip = await DbClient.instance.query.trip.findFirst({
        where: eq(TripTable.id, id),
        with: {
          owner: {
            columns: {
              id: true,
              username: true,
            },
          },
          packs: {
            columns: { id: true, name: true },
            with: {
              itemPacks: {
                columns: { packId: true },
                with: {
                  item: {
                    columns: {
                      id: true,
                      name: true,
                      weight: true,
                      quantity: true,
                      unit: true,
                    },
                    with: {
                      category: {
                        columns: { id: true, name: true },
                      },
                    },
                  },
                },
              },
            },
          },
          tripGeojsons: {
            columns: {},
            with: {
              geojson: true,
            },
          },
        },
      });
      return trip;
    } catch (error) {
      throw new Error(`Failed to find trip by id: ${error.message}`);
    }
  }

  async findPublicTrips(queryBy: string) {
    try {
      const publicTrips = await DbClient.instance.query.trip.findMany({
        where: eq(TripTable.is_public, true),
        with: {
          owner: {
            columns: {
              id: true,
              username: true,
            },
          },
          packs: {
            columns: {
              id: true,
              name: true,
              is_public: true,
            },
          },
        },
        orderBy: (trip: any, { asc, desc }) =>
          queryBy === 'Favorite' ? desc(trip.id) : asc(trip.id),
      });
      return publicTrips;
    } catch (error) {
      throw new Error(`Error finding trips: ${error.message}`);
    }
  }

  async findMany(ownerId?: string) {
    try {
      const trips = await DbClient.instance.query.trip.findMany({
        ...(ownerId && { where: eq(TripTable.owner_id, ownerId) }),
        with: {
          packs: {
            columns: {
              id: true,
              name: true,
              is_public: true,
            },
          },
        },
      });
      return trips;
    } catch (error) {
      throw new Error(`Failed to fetch trips: ${error.message}`);
    }
  }
}
