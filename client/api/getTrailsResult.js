// Import necessary modules and environment variable
import { GEOAPIFY_KEY } from "@env";
import axios from "axios";

// Function to get trails data based on an array of addresses using the Photon API
export const getTrailsResult = async (addressArray) => {
  // Define parameters for the Photon API request
  let params = {
    q: addressArray,
    osm_tag: ["highway:footway"],
  };

  // Create a query string from the parameters
  const queryString = Object.entries(params)
    .flatMap(([key, values]) =>
      Array.isArray(values)
        ? values.map((val) => `${key}=${val}`)
        : `${key}=${values}`
    )
    .join("&");

  // Send a GET request to the Photon API with the constructed query string
  const response = await axios.get(
    `https://photon.komoot.io/api/?${queryString}`
  );

  // Extract the names of trails from the API response data and store them in the trailsArray
  trailsArray = response.data.features.map((_item) => _item?.properties?.name);

  // Return the trailsArray containing the names of trails
  return trailsArray;
};
