import { describe, it, expect, beforeEach } from 'vitest';
import { setupTest } from '../utils/testHelpers';
import type { trpcCaller } from '../utils/testHelpers';
import type { Trip } from '../../db/schema';
import { env } from 'cloudflare:test';

describe('Trip Routes', () => {
  let caller: trpcCaller;
  let trip: Trip;

  beforeEach(async () => {
    caller = await setupTest(env);
  });

  describe('Get public trips', () => {
    it('Get public trips', async () => {
      const trips = await caller.getPublicTripsRoute({
        queryBy: 'Favorite',
      });
      expect(trips).toBeDefined();
      if (trips?.[0]) {
        trip = trips[0];
      }
    });
  });

  describe('Get trips by owner', () => {
    it('Get trips by owner', async () => {
      if (trip) {
        const ownerId = trip.owner_id?.toString();
        const [ownerTrip] = await caller.getTrips({
          owner_id: ownerId,
        });
        expect(ownerTrip?.owner_id?.toString()).toEqual(ownerId);
      }
    });
  });

  describe('Edit trip', () => {
    it('Edit trip', async () => {
      if (trip) {
        const nameToBeUpdated = 'updated trip';
        //! need to convert dates to string for input
        const updatedTrip = await caller.editTrip({
          ...trip,
          id: trip?.id?.toString(),
          start_date: trip.start_date.toString(),
          end_date: trip.end_date.toString(),
          is_public: true,
          name: nameToBeUpdated,
        });
        expect(updatedTrip.name).toEqual(nameToBeUpdated);
        trip = updatedTrip;
      }
    });
  });

  //! can't test create trip on a temporary basis as feature is required in input
  //! will update this after creating packs to add with input
  // describe('Create trip', () => {
  //   it('Create trip', async () => {
  //     const { id, ...partialTrip } = trip;
  //     const input = {
  //       ...partialTrip,
  //       geoJSON: partialTrip.geojson,
  //       owner_id: partialTrip.owner_id.toString(),
  //       start_date: trip.start_date.toString(),
  //       end_date: trip.end_date.toString(),
  //     };
  //     //! addTripService contains wrong return type
  //     const createdTrip = await caller.addTrip(input);
  //     expect(createdTrip?.message).toEqual('Trip added successfully');
  //     expect(createdTrip?.trip).toBeDefined();
  //   });
  // });

  describe('Delete trip', () => {
    it('Delete trip', async () => {
      if (trip) {
        //! need to convert dates to string for input
        const response = await caller.deleteTrip({
          tripId: trip.id.toString(),
        });
        expect(response).toEqual('trip was deleted successfully');
      }
    });
  });
});
