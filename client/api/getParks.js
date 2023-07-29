import { api } from "../constants/api";
import abbrRegion from "../constants/convertStateToAbbr";
import axios from "axios";
import osmtogeojson from "osmtogeojson";

export const getParksRapid = async (state) => {
  let parksArray = [];
  const abbrState = abbrRegion(state, "abbr") ?? "";
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
  if (parksArray.length > 0) {
    parksArray = parksArray.map((park) => park.name);
  } else {
    parksArray = [];
  }

  return parksArray;
};

export const getParksOSM = async (lat, lon) => {
  const radius = 50000; // Search radius in meters
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
    const response = await axios.post(overpassUrl, query, {
      headers: { "Content-Type": "text/plain" },
    });
    const geojsonData = osmtogeojson(response.data);
    return geojsonData;
  } catch (error) {
    console.error("Error fetching parks:", error);
  }
};
