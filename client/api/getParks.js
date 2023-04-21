// import { NPS_API } from "../constants/api";
import { NPS_API, X_RAPIDAPI_KEY } from "@env";
import abbrRegion from "../constants/convertStateToAbbr";
import axios from "axios";
import osmtogeojson from "osmtogeojson";

export const getParksRapid = async (state) => {
  let parksArray = [];

  const host = `https://jonahtaylor-national-park-service-v1.p.rapidapi.com/parks?stateCode=${
    abbrRegion(state, "abbr") ?? ""
  }`;

  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": `${NPS_API}`,
      "X-RapidAPI-Key": `${X_RAPIDAPI_KEY}`,
      "X-RapidAPI-Host": "jonahtaylor-national-park-service-v1.p.rapidapi.com",
      "User-Agent": "PackRat",
    },
  };

  await fetch(host, options)
    .then((res) => res.json())
    .then((json) => {
      // console.log("json.data:", json.data);
      json.data.forEach((item) => {
        parksArray.push(item);
      });
    })
    .catch((err) => console.error("error:" + err));

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
  const overpassUrl = 'https://overpass-api.de/api/interpreter';

  try {
    const response = await axios.post(overpassUrl, query, {
      headers: { 'Content-Type': 'text/plain' },
    });
    const geojsonData = osmtogeojson(response.data);
    return geojsonData;
  } catch (error) {
    console.error('Error fetching parks:', error);
  }
};
