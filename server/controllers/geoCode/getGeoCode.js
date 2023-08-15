import fetch from "node-fetch";
import { oneEntity } from "../../utils/oneEntity.js";

<<<<<<< HEAD:server/controllers/geoCodeController.js
// Function to get geocode information for a given address
=======
/**
 * Retrieves the geocode for a given address array.
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.addressArray - The address array to retrieve the geocode for.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the geocode is retrieved and the response is sent.
 */
>>>>>>> andrew_testing:server/controllers/geoCode/getGeoCode.js
export const getGeoCode = async (req, res) => {
  // Call the oneEntity utility function to handle the addressArray parameter
  let addressArray = await oneEntity(req.query.addressArray);

  // Transform the addressArray into a format suitable for the API request
  const transform = addressArray.split(", ").join("%20").split(" ").join("%20");

  // Retrieve the GEO_CODE_URL and GEOAPIFY_KEY from environment variables
  const GEO_CODE_URL = process.env.GEO_CODE_URL;
  const GEOAPIFY_KEY = process.env.GEOAPIFY_KEY;

  // Initialize parameters for the API request
  let params = `?`;
  if (addressArray) params += `text=${transform}`;

  // Append the GEOAPIFY_KEY to the parameters
  const api_key = `&apiKey=${GEOAPIFY_KEY}`;
  params += api_key;

  // Create the URL for the geocode API request
  const url = GEO_CODE_URL + params;

  // Send a GET request to the geocode API with the constructed URL
  await fetch(url)
    .then((response) => response.json())
    .then((result) => {
      // Send the geocode result as the response
      res.send(result);
    })
    .catch(() => res.send({ message: "Error fetching GeoCode" }));
};
