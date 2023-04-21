import { X_RAPIDAPI_KEY } from "@env";
import axios from "axios";
import osmtogeojson from "osmtogeojson";

export const getTrailsRapid = async (locationObject, latParams, lonParams) => {
  let trailsArray = [];

  let radiusParams = 25;
  let activityParams = true;

  const {
    administrative_area_level_1: state,
    country,
    locality: city,
  } = locationObject;

  let paramsConditional = "";

  const root = "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?";

  if (latParams) paramsConditional += `lat=${latParams}`;
  if (lonParams) paramsConditional += `&lon=${lonParams}`;

  if (city) paramsConditional += `&q-city_cont=${city.replace(/\s/g, "")}`;

  if (radiusParams) paramsConditional += `&radius=${radiusParams}`;
  if (activityParams)
    paramsConditional += `&q-activities_activity_type_name_eq=hiking`;

  // const limitParams = `limit=${limit}`

  // const latParams = `lat=34.1`

  // const lonParams = `lon=-105.2`

  // const cityParams = `q-city_cont=${city}`

  // const radiusParams = `radius=50`

  // const activityParams = 'q-activities_activity_type_name_eq=hiking'

  // const params = `?${limitParams}&${latParams}&${lonParams}&${city ? cityParams : ''}&${radiusParams}&${activityParams}`

  // const params = `?${limitParams}&${latParams}&${lonParams}&${cityParams}&${radiusParams}&${activityParams}`

  const url1 = root + paramsConditional;

  // https://trailapi-trailapi.p.rapidapi.com/activity/?&lat=34.1&lon=-105.2&q-city_cont=Charlottesville&radius=50&q-activities_activity_type_name_eq=hiking
  const url =
    "https://trailapi-trailapi.p.rapidapi.com/activity/?lat=34.1&lon=-105.2&q-city_cont=Denver&radius=25&q-activities_activity_type_name_eq=hiking";
  // const url = 'https://trailapi-trailapi.p.rapidapi.com/activity?lat=34.1&limit=25&lon=-105.2&q-city_cont=Denver&q-country_cont=Australia&q-state_cont=California&radius=25&q-activities_activity_type_name_eq=hiking'
  // const url = root + `${cityParams}&${activityParams}`
  // const url = root + `?${activityParams}&${limitParams}`

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${X_RAPIDAPI_KEY}`,
      "X-RapidAPI-Host": "trailapi-trailapi.p.rapidapi.com",
    },
  };

  await fetch(url1, options)
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
  const overpassUrl = 'https://overpass-api.de/api/interpreter'; // change to server on merge

  try {
    const response = await axios.post(overpassUrl, query, {
      headers: { 'Content-Type': 'text/plain' },
    });
        // Convert the response data to GeoJSON format
        const geojsonData = osmtogeojson(response.data);

        return geojsonData;
  } catch (error) {
    console.error('Error fetching trails:', error);
  }
}




