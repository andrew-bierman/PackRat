import type { Trip as TTrip } from '@prisma/client';

type ExtendedTrip = {
  toJSON: () => Partial<TTrip>;
};

const Trip = <T>(prismaTrip: T): T & ExtendedTrip => {
  return Object.assign(prismaTrip, {
    toJSON(): Partial<TTrip> {
      const trip: TTrip = this;
      const { ...tripObject } = trip;
      tripObject.geojson = {
        type: 'FeatureCollection',
        features: tripObject.geojson,
      };
      return tripObject;
    },
  });
};

export { Trip };
