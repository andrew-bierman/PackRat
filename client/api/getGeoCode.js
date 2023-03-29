// import { Geoapify_Key } from "../constants/api";
import { GEOAPIFY_KEY } from "@env";

export const getGeoCode = async (addressArray = "Virginia") => {
  const transform = addressArray.split(", ").join("%20").split(" ").join("%20");

  const root = "https://api.geoapify.com/v1/geocode/search";

  let params = `?`;

  //   let addressParams = addressArray.join("%20").replace(/\s/g, "%20");

  if (addressArray) params += `text=${transform}`;

  const api_key = `&apiKey=${GEOAPIFY_KEY}`;

  params += api_key;

  const url = root + params;

  let resultReturn;

  await fetch(url)
    .then((response) => response.json())
    .then((result) => {
      resultReturn = result;
    })
    .catch((error) => console.log("error", error));

  return resultReturn;
};
