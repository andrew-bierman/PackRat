import { GeoJSON } from '@prisma/client/edge';

async function saveOne(feature: GeoJSON) {
  return this.upsert({
    where: { id: feature.id },
    update: feature,
    create: feature,
  });
}

async function saveMany(features: GeoJSON[]) {
  await Promise.all(
    features.map((feature) => this.geoJSON.create({ data: feature })),
  );
}

export default { saveOne, saveMany };
