import { PrismaClient } from '@prisma/client/edge';
import { userStatics, geojsonStatics, nodeStatics } from './statics';

const getPrismaClient = (dbURL: string) =>
  new PrismaClient({
    datasources: {
      db: {
        url: String(dbURL),
      },
    },
  }).$extends({
    // Model level extensions
    model: {
      geoJSON: {
        ...geojsonStatics,
      },
      user: {
        ...userStatics,
      },
      node: {
        ...nodeStatics,
      },
    },
  });

export { getPrismaClient };
