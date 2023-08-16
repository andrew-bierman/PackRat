import { api } from "../constants/api";

export const getGeoCode = async (addressArray) => {
  let resultReturn;
  await fetch(`${api}/geocode?addressArray=${addressArray}`)
    .then((response) => response.json())
    .then((result) => {
      resultReturn = result;
    })
    .catch((error) => console.log("error", error));

  return resultReturn;
};
