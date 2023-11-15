import { GeoJSON } from '@prisma/client/edge';
import prisma from '../client';

async function saveOne(feature: GeoJSON) {
  return prisma.geoJSON.upsert({
    where: { id: feature.id },
    update: feature,
    create: feature,
  });
}

async function saveMany(features: GeoJSON[]) {
  return prisma.$transaction(
    features.map((feature) => prisma.geoJSON.create({ data: feature })),
  );
}

export default { saveOne, saveMany };
