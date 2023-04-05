import { api } from "../constants/api";
import abbrRegion from "../constants/convertStateToAbbr";

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
      }).catch((err) => console.error("error:" + err));
  }
  if (parksArray.length > 0) {
    parksArray = parksArray.map((park) => park.name);
  } else {
    parksArray = [];
  }

  return parksArray;
};
