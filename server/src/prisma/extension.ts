import basePrismaClient from './client';
import { userStatics, geojsonStatics } from './statics';

const prisma = basePrismaClient.$extends({
  // Model level extensions
  model: {
    geoJSON: {
      ...geojsonStatics,
    },
    user: {
      ...userStatics,
    },
  },
});

export { prisma };
