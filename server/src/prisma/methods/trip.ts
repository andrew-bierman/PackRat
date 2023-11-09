import type { Trip as TTrip, GeoJSON } from '@prisma/client';

type ExtendedTrip = {
  toJSON: () => Partial<TTrip>;
};

const Trip = <T extends TTrip>(prismaTrip: T): T & ExtendedTrip => {
  return Object.assign(prismaTrip, {
    toJSON(): Partial<TTrip> & {
      geojson?: { type: string; features: GeoJSON };
    } {
      const trip: T & { geojson: GeoJSON } = this as T & { geojson: GeoJSON };
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
