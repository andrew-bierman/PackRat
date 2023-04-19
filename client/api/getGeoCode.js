// import { Geoapify_Key } from "../constants/api";
import { GEOAPIFY_KEY } from "@env";
import axios from "axios";

export const getGeoCode = async (addressArray) => {
  // const transform = addressArray.split(", ").join("%20").split(" ").join("%20");
  // let trailsArray = [];

  // if (addressArray) params += `text=${transform}`;

  // const api_key = `&apiKey=${GEOAPIFY_KEY}`;

  // params += api_key;

  const response = await axios.get(`https://photon.komoot.io/api/?q=${addressArray}&osm_tag=highway:footway`);

  console.log("response", response);

  trailsArray = response.data.features.map((_item) => _item?.properties?.name);
  return trailsArray

  // await fetch(url)
  //   .then((response) => response.json())
  //   .then((result) => {
  //     resultReturn = result;
  //   })
  //   .catch((error) => console.log("error", error));


  // return resultReturn;
};
