// import osmtogeojson from 'osmtogeojson';
// import {
//   ErrorProcessingRequestError,
//   InvalidRequestParamsError,
// } from '../../helpers/errors';
// import { responseHandler } from '../../helpers/responseHandler';

// /**
//  * Retrieves enhanced details for a photon based on the given id and type.
//  * @param {object} req - The request object.
//  * @param {object} res - The response object.
//  * @return {Promise} A promise that resolves to the enhanced photon details.
//  */
// export const getEnhancedPhotonDetails = async (req, res, next) => {
//   let { id, type } = req.params;

//   if (!id || !type) {
//     next(InvalidRequestParamsError);
//   }

//   type = type.toLowerCase(); // Standardize osm_type to be lowercase

//   switch (type) {
//     case 'way':
//     case 'w':
//       type = 'way';
//       break;
//     case 'node':
//     case 'n':
//       type = 'node';
//       break;
//     case 'relation':
//     case 'r':
//       type = 'relation';
//       break;
//     default:
//       next(InvalidRequestParamsError);
//   }

//   const overpassUrl = process.env.OSM_URI;

//   if (!overpassUrl) {
//     throw new Error('OSM_URI is not defined in the environment variables');
//   }

//   const overpassQuery = `
//     [out:json][timeout:25];
//     ${type}(${id});
//     (._;>;);
//     out body;
//   `;

//   console.log('overpassQuery', overpassQuery);

//   const nominatimUrl = `https://nominatim.openstreetmap.org/lookup?format=json&osm_ids=${type[0]}${id}&addressdetails=1`;

//   try {
//     const overpassResponse = await fetch(overpassUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'text/plain',
//       },
//       body: overpassQuery,
//     });

//     const nominatimResponse = await fetch(nominatimUrl);

//     if (overpassResponse.ok && nominatimResponse.ok) {
//       const overpassData = await overpassResponse.json();
//       const nominatimData = await nominatimResponse.json();

//       console.log('nominatimData', nominatimData);

//       const geojsonData = osmtogeojson(overpassData);

//       // Add Nominatim data into each feature properties of the GeoJSON
//       geojsonData.features.forEach((feature) => {
//         feature.properties = {
//           ...feature.properties,
//           ...nominatimData,
//         };
//       });

//       res.locals.data = geojsonData;
//       responseHandler(res);
//     } else {
//       console.log(overpassResponse.status, overpassResponse.statusText);
//       console.log(nominatimResponse.status, nominatimResponse.statusText);
//       next(ErrorProcessingRequestError);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     next(ErrorProcessingRequestError);
//   }
// };
