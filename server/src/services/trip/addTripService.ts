import { Trip } from '../../drizzle/methods/trip';
import { TripGeoJson } from '../../drizzle/methods/TripGeoJson';
import { GeoJson } from '../../drizzle/methods/GeoJson';

export const addTripService = async (tripDetails) => {
  try {
    const { geoJSON, ...otherTripDetails } = tripDetails;
    const tripClass = new Trip();
    const newTrip = await tripClass.create(otherTripDetails);
    const geoJSONClass = new GeoJson();
    const tripGeoJsonClass = new TripGeoJson();

    // Assuming geoJSON contains a FeatureCollection
    for (const feature of geoJSON.features) {
      const insertedGeoJSON = await geoJSONClass.create({
        type: feature.type,
        geojsonId: feature.id, // Ensure you have a unique identifier here
        properties: JSON.stringify(feature.properties),
        geometry: JSON.stringify(feature.geometry),
      });

      // Link the trip with the GeoJSON feature in trip_geojsons table
      await tripGeoJsonClass.create({
        tripId: newTrip.id,
        geojsonId: insertedGeoJSON.id,
      });
    }

    return { message: 'Trip and GeoJSON added successfully', trip: newTrip };
  } catch (error) {
    console.error(error);
    throw new Error('Unable to add trip and GeoJSON data');
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
