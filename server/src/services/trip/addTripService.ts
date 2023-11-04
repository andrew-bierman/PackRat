import { prisma } from '../../prisma/index';
export const addTripService = async (tripDetails): Promise<any> => {
  try {
    const {
      name,
      description,
      duration,
      weather,
      start_date,
      end_date,
      destination,
      geoJSON,
      owner_id,
      packs,
      is_public,
    } = tripDetails;

    // Save all the Features from the FeatureCollection
    const savedGeoJSONs: any = await prisma.geojson.createMany({
      data: geoJSON.features,
    });

    const geojsonIds = savedGeoJSONs.map((feature) => feature.id);

    const newTrip = await prisma.trip.create({
      data: {
        name,
        description,
        duration,
        weather,
        start_date,
        end_date,
        destination,
        geojson: {
          connect: geojsonIds.map((id) => ({ id })),
        },
        owner_id,
        packs: {
          connect: packs.map((packId) => ({ id: packId })),
        },
        is_public,
      },
    } as any);

    return { message: 'Trip added successfully', trip: newTrip };
  } catch (error) {
    console.error(error);
    throw new Error('Unable to add trip');
  }
};
const createOSMObject = async (geoJSON) => {
  if (!geoJSON?.properties) {
    throw new Error('Invalid or missing geoJSON');
  }

  const osmType = geoJSON.properties.osm_type;

  if (osmType !== 'N' && osmType !== 'W' && osmType !== 'R') {
    throw new Error('Invalid OSM type');
  }

  let osmModel;
  if (osmType === 'N') {
    osmModel = prisma.node;
  } else if (osmType === 'W') {
    osmModel = prisma.way;
  } else if (osmType === 'R') {
    osmModel = prisma.relation;
  }

  const osmData = await osmModel.create({
    data: {
      osm_id: geoJSON.properties.osm_id,
      osm_type: osmType === 'N' ? 'node' : osmType === 'W' ? 'way' : 'relation',
      tags: geoJSON.properties,
      geoJSON,
    },
  });

  return {
    osm_ref: osmData.id,
    osm_type: osmType === 'N' ? 'Node' : osmType === 'W' ? 'Way' : 'Relation',
  };
};
