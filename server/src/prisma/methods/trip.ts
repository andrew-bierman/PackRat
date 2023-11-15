import type { Trip as TTrip, GeoJSON } from '@prisma/client/edge';

type ExtendedTrip = {
  toJSON: () => Partial<TTrip>;
};

const Trip = <T extends TTrip>(prismaTrip: T): T & ExtendedTrip => {
  if (!prismaTrip) return;
  return Object.assign(prismaTrip, {
    toJSON(): Partial<TTrip> & {
      geojson?: { type: string; features: GeoJSON };
    } {
      const {
        // destructure methods
        toJSON,
        ...trip
      } = this;
      const { ...tripObject }: Record<string, any> = trip;
      if (!trip.geojson) return tripObject;
      tripObject.geojson = {
        type: 'FeatureCollection',
        features: tripObject.geojson,
      };
      return tripObject;
    },
  });
};

export { Trip };
