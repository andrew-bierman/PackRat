import { setupTest, teardownTest } from '../utils/testHelpers';

let caller;

beforeEach(async () => {
  const testSetup = await setupTest();
  caller = testSetup.caller;
});

afterEach(async () => {
  await teardownTest();
});

describe('Trip Routes', () => {
  let trip;

  describe('Get public trips', () => {
    test('Get public trips', async () => {
      const trips = (await caller.getPublicTripsRoute({
        queryBy: 'Favorite',
      })) as any[];

      expect(trips).toBeDefined();

      trip = trips[0];
    });
  });

  describe('Get trips by owner', () => {
    test('Get trips by owner', async () => {
      if (trip) {
        const ownerId = trip?.owner?._id.toString();

        const [ownerTrip] = (await caller.getTrips({
          owner_id: ownerId,
        })) as any[];

        expect(ownerTrip?.owner_id?.toString()).toEqual(ownerId);
      }
    });
  });

  describe('Edit trip', () => {
    test('Edit trip', async () => {
      if (trip) {
        const nameToBeUpdated = 'updated trip';

        //! need to convert dates to string for input
        const updatedTrip = await caller
          .editTrip({
            ...trip,
            _id: trip?._id?.toString(),
            start_date: trip.start_date.toString(),
            end_date: trip.end_date.toString(),
            is_public: true,
            name: nameToBeUpdated,
          })
          .then((trip) => trip.toJSON());

        expect(updatedTrip.name).toEqual(nameToBeUpdated);

        trip = updatedTrip;
      }
    });
  });

  //! can't test create trip on a temporary basis as feature is required in input
  //! will update this after creating packs to add with input
  //   describe('Create trip', () => {
  //     test('Create trip', async () => {
  //       const { _id, ...partialTrip } = trip;

  //       const input = {
  //         ...partialTrip,
  //         geoJSON: partialTrip.geojson,
  //         owner_id: partialTrip.owner_id.toString(),
  //         start_date: trip.start_date.toString(),
  //         end_date: trip.end_date.toString(),
  //       };

  //       //! addTripService contains wrong return type
  //       const createdTrip = (await caller.addTrip(input)) as any;

  //       expect(createdTrip?.message).toEqual('Trip added successfully');
  //       expect(createdTrip?.trip).toBeDefined();
  //     });
  //   });

  describe('Delete trip', () => {
    test('Delete trip', async () => {
      if (trip) {
        //! need to convert dates to string for input
        const response = await caller.deleteTrip({
          tripId: trip._id.toString(),
        });

        expect(response).toEqual('trip was deleted successfully');
      }
    });
  });
});
