import { api } from "../constants/api";

export const getWeather = async (lat, lon, state) => {
  let weatherObject = {};

  let params = `?`;

  const latParams = lat;
  const lonParams = lon;

  if (latParams) params += `lat=${latParams}`;
  if (lonParams) params += `&lon=${lonParams}`;

  const url = api + "/weather" + params;

  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      weatherObject = json;
    })
    .catch((err) => {
      console.error("error:" + err);
    });

  weatherObject.state = state;
  return weatherObject;
};
