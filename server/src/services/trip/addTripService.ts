import { Trip } from '../../drizzle/methods/trip';
import { TripGeoJson } from '../../drizzle/methods/TripGeoJson';

export const addTripService = async (tripData: any, geojson_id: string) => {
  try {
    const tripGeoJsonClass = new TripGeoJson();
    const tripClass = new Trip();
    // Create Trip
    const newTrip = await tripClass.create(tripData);

    await tripGeoJsonClass.create({
      tripId: newTrip.id,
      geojsonId: geojson_id,
    });
    return newTrip;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to add trip');
  }
};

// import { PrismaClient } from '@prisma/client/edge';
// import { Trip } from '../../prisma/methods';

// export const addTripService = async (
//   prisma: PrismaClient,
//   tripData,
// ): Promise<any> => {
//   try {
//     const {
//       name,
//       description,
//       duration,
//       weather,
//       start_date,
//       end_date,
//       destination,
//       geoJSON,
//       owner_id,
//       packs,
//       is_public,
//     } = tripData;

//     // Save all the Features from the FeatureCollection

//     const savedGeoJSONs = await Promise.all(
//       geoJSON.features.map((feature) =>
//         prisma.geoJSON.create({ data: feature }),
//       ),
//     );

//     const geojsonIds = savedGeoJSONs.map((feature) => feature.id);

//     const newTrip = await prisma.trip.create({
//       data: {
//         name,
//         description,
//         duration,
//         weather,
//         start_date,
//         end_date,
//         destination,
//         geojson: geojsonIds.map((id) => ({ $oid: id })),
//         is_public,
//         ownerDocument: {
//           connect: { id: owner_id },
//         },
//         packs: packs,
//       },
//     });

//     return {
//       message: 'Trip added successfully',
//       trip: await Trip(newTrip)?.toJSON(prisma),
//     };
//   } catch (error) {
//     console.error(error);
//     throw new Error('Unable to add trip');
//   }
// };

// // This function is un-used now. Trip model does not have osm related properties
// // const createOSMObject = async (geoJSON) => {
// //   if (!geoJSON?.properties) {
// //     throw new Error('Invalid or missing geoJSON');
// //   }

// //   const osmType = geoJSON.properties.osm_type;

// //   if (osmType !== 'N' && osmType !== 'W' && osmType !== 'R') {
// //     throw new Error('Invalid OSM type');
// //   }

// //   let osmModel;
// //   if (osmType === 'N') {
// //     osmModel = prisma.node;
// //   } else if (osmType === 'W') {
// //     osmModel = prisma.way;
// //   } else if (osmType === 'R') {
// //     osmModel = prisma.relation;
// //   }

// //   const osmData = await osmModel.create({
// //     data: {
// //       osm_id: geoJSON.properties.osm_id,
// //       osm_type: osmType === 'N' ? 'node' : osmType === 'W' ? 'way' : 'relation',
// //       tags: geoJSON.properties,
// //       geoJSON,
// //     },
// //   });

// //   return {
// //     osm_ref: osmData.id,
// //     osm_type: osmType === 'N' ? 'Node' : osmType === 'W' ? 'Way' : 'Relation',
// //   };
// // };
