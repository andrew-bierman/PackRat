// Import necessary modules and constants
import { api } from "../constants/api";
import abbrRegion from "../constants/convertStateToAbbr";
import axios from "axios";
import osmtogeojson from "osmtogeojson";

// Function to get parks data rapidly based on the state abbreviation
export const getParksRapid = async (state) => {
  let parksArray = [];

  // Convert state name to its abbreviation
  const abbrState = abbrRegion(state, "abbr") ?? "";

  // Check if the state abbreviation is available
  if (abbrState) {
    await fetch(`${api}/getparks?abbrState=${abbrState}`)
      .then((res) => res.json())
      .then((json) => {
        json.data.forEach((item) => {
          parksArray.push(item);
        });
      })
      .catch((err) => console.error("error:" + err));
  }

  // If parks are available, extract their names; otherwise, set parksArray to an empty array
  if (parksArray.length > 0) {
    parksArray = parksArray.map((park) => park.name);
  } else {
    parksArray = [];
  }

  return parksArray;
};

// Function to get parks data using OpenStreetMap (OSM) API based on latitude and longitude
export const getParksOSM = async (lat, lon) => {
  const radius = 50000; // Search radius in meters

  // OSM query to fetch parks data within the specified radius around the given latitude and longitude
  const query = `
    [out:json][timeout:25];
    (
      way["leisure"="park"]["name"](around:${radius},${lat},${lon});
      relation["leisure"="park"]["name"](around:${radius},${lat},${lon});
    );
    (._;>;);
    out tags geom qt;
  `;

  const overpassUrl = "https://overpass-api.de/api/interpreter";

  try {
    // Send the OSM query to the Overpass API using Axios
    const response = await axios.post(overpassUrl, query, {
      headers: { "Content-Type": "text/plain" },
    });

    // Convert the response data to GeoJSON format using osmtogeojson library
    const geojsonData = osmtogeojson(response.data);

    return geojsonData;
  } catch (error) {
    console.error("Error fetching parks:", error);
  }
};
