import basePrismaClient from './client';
import { userStatics, geojsonStatics, nodeStatics } from './statics';

const prisma = basePrismaClient.$extends({
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

export { prisma };
