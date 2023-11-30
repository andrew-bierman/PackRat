import type { Trip as TTrip, GeoJSON } from '@prisma/client/edge';

type ExtendedTrip = {
  toJSON: (prisma: any) => Promise<Partial<TTrip>>;
};

const Trip = <T extends TTrip>(prismaTrip: T): T & ExtendedTrip => {
  if (!prismaTrip) return;
  return Object.assign(prismaTrip, {
    async toJSON(prisma): Promise<
      Partial<TTrip> & {
        geojson?: { type: string; features: GeoJSON };
      }
    > {
      const {
        // destructure methods
        toJSON,
        ...trip
      } = this;
      const { ...tripObject }: Record<string, any> = trip;
      if (!trip.geojson) return tripObject;

      const geojsonIds: string[] = Array.isArray(trip.geojson)
        ? trip.geojson.map((geojson) => geojson['$oid'])
        : [trip.geojson['$oid']];

      const geojsonDocuments = await prisma.geoJSON.findMany({
        where: { id: { in: geojsonIds.filter((id) => !!id) } },
      });

      tripObject.geojson = {
        type: 'FeatureCollection',
        features: geojsonDocuments,
      };

      const documentKeys = Object.keys(tripObject).filter(
        (key) => key.includes('Document') || key.includes('Documents'),
      );

      for (const key of documentKeys) {
        const newKey = key.replace('Document', '').replace('Documents', '');
        tripObject[newKey] = tripObject[key];
        delete tripObject[key];
      }

      return tripObject;
    },
  });
};

export { Trip };
