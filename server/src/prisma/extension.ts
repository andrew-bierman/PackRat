import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { userStatics, geojsonStatics, nodeStatics } from './statics';

const getPrismaClient = (dbURL: string) =>
  new PrismaClient({
    datasources: {
      db: {
        url: String(dbURL),
      },
    },
  })
    .$extends(withAccelerate())
    .$extends({
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
