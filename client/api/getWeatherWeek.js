import { api } from "../constants/api";

export const getWeatherWeek = async (lat, lon) => {
  let weatherObject = {};

  let params = `?`;

  const latParams = lat;
  const lonParams = lon;

  if (latParams) params += `lat=${latParams}`;
  if (lonParams) params += `&lon=${lonParams}`;

  const url = api + "/weather/week" + params;

  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      weatherObject = json;
    })
    .catch((err) => {
      console.log("error:" + err);
    });

  return weatherObject.list.slice(0, 4);
};
