import { X_RAPIDAPI_KEY } from "@env";
import axios from "axios";
import osmtogeojson from "osmtogeojson";

// Function to get trails data rapidly based on locationObject, latitude, and longitude parameters
export const getTrailsRapid = async (locationObject, latParams, lonParams) => {
  let trailsArray = [];

  // Send a POST request to the API to fetch trails data based on the provided locationObject and coordinates
  await fetch(api + "/gettrails", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...locationObject,
      latitude: latParams,
      longitude: lonParams,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      // Extract trails data from the response and push them into trailsArray
      Object.values(json).forEach((item) => {
        trailsArray.push(item);
      });
    })
    .catch((err) => {
      // Handle errors if any occur during the API request
      console.log("message====>" + err.message);
      console.error("error:" + err);
    });

  // Check if trails data is available and extract the names; otherwise, set trailsArray to an empty array
  if (trailsArray[1] !== undefined) {
    trailsArray = trailsArray[1]?.map((trail) => trail.name);
  } else {
    trailsArray = [];
  }

  return trailsArray;
};

// Function to get trails data using OpenStreetMap (OSM) API based on latitude and longitude
export const getTrailsOSM = async (lat, lon) => {
  const radius = 50000; // Search radius in meters

  // OSM query to fetch trails data for footways within the specified radius around the given latitude and longitude
  const query = `
  [out:json][timeout:25];
  (
    way["highway"~"footway"]["name"](around:${radius},${lat},${lon});
  );
  (._;>;);
  out tags geom qt;
  `;
  const overpassUrl = "https://overpass-api.de/api/interpreter"; // change to server on merge

  try {
    // Send the OSM query to the Overpass API using Axios
    const response = await axios.post(overpassUrl, query, {
      headers: { "Content-Type": "text/plain" },
    });
    // Convert the response data to GeoJSON format using osmtogeojson library
    const geojsonData = osmtogeojson(response.data);

    return geojsonData;
  } catch (error) {
    console.error("Error fetching trails:", error);
  }
};
