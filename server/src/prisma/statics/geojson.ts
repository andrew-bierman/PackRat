import { GeoJSON } from '@prisma/client';
import prisma from '../client';

async function saveOne(feature: GeoJSON) {
  return prisma.geoJSON.upsert({
    where: { id: feature.id },
    update: feature,
    create: feature,
  });
}

async function saveMany(features: GeoJSON[]) {
  return prisma.geoJSON.createMany({
    data: features,
  });
}

export default { saveOne, saveMany };
