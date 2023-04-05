import { api } from "../constants/api";

export const getTrailsRapid = async (locationObject, latParams, lonParams) => {
  let trailsArray = [];

  await fetch(api + "/gettrails", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...locationObject, latitude: latParams, longitude: lonParams })
  }).then((res) => res.json())
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
