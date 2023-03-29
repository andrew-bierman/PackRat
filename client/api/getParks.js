// import { NPS_API } from "../constants/api";
import { NPS_API, X_RAPIDAPI_KEY } from "@env";
import abbrRegion from "../constants/convertStateToAbbr";

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
