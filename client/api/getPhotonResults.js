import axios from "axios";

// Function to fetch Photon results based on an array of addresses
export const getPhotonResults = async (addressArray) => {
  // Check if the addressArray is valid; if not, return early
  if (!addressArray) return;

  // Define parameters for the Photon API request
  let params = {
    q: addressArray,
    osm_tag: ["highway:footway", "highway:cycleway", "place"],
    // osm_tag: "highway:footway",
    // osm_tag: "highway:cycleway",
    // osm_tag: "place",
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

  // Extract the results array from the API response data
  const resultsArray = response.data.features;

  // Return the results array
  return resultsArray;
};
