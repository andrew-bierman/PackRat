import { X_RAPIDAPI_KEY } from "@env";
import axios from "axios";
import osmtogeojson from "osmtogeojson";

export const getTrailsRapid = async (locationObject, latParams, lonParams) => {
  let trailsArray = [];

  await fetch(api + "/trails", {
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
      Object.values(json).forEach((item) => {
        trailsArray.push(item);
      });
    })
    .catch((err) => {
      console.log("message====>" + err.message);
      console.error("error:" + err);
    });

  if (trailsArray[1] !== undefined) {
    trailsArray = trailsArray[1]?.map((trail) => trail.name);
  } else {
    trailsArray = [];
  }

  return trailsArray;
};

export const getTrailsOSM = async (lat, lon) => {
  const radius = 50000; // Search radius in meters
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
    const response = await axios.post(overpassUrl, query, {
      headers: { "Content-Type": "text/plain" },
    });
    // Convert the response data to GeoJSON format
    const geojsonData = osmtogeojson(response.data);

    return geojsonData;
  } catch (error) {
    console.error("Error fetching trails:", error);
  }
};
