// import { Geoapify_Key } from "../constants/api";
import { GEOAPIFY_KEY } from "@env";
import axios from "~/config/axios";

export const getTrailsResult = async (addressArray) => {
  let params = {
    q: addressArray,
    osm_tag: ["highway:footway"],
  };
  const queryString = Object.entries(params)
    .flatMap(([key, values]) =>
      Array.isArray(values)
        ? values.map((val) => `${key}=${val}`)
        : `${key}=${values}`
    )
    .join("&");

  const response = await axios.get(
    `https://photon.komoot.io/api/?${queryString}`
  );

  trailsArray = response.data.features.map((_item) => _item?.properties?.name);
  return trailsArray;
};
