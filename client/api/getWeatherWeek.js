// import { OpenWeather_Key } from "../constants/api";
import { OPENWEATHER_KEY } from "@env";

export const getWeatherWeek = async (lat, lon) => {
  let weatherObject = {};

  const root = "https://api.openweathermap.org/data/2.5/forecast";

  let params = `?`;

  const latParams = lat;
  const lonParams = lon;
  const unitParams = "imperial";

  const apiParams = true;

  if (latParams) params += `lat=${latParams}`;
  if (lonParams) params += `&lon=${lonParams}`;
  if (unitParams) params += `&units=${unitParams}`;
  if (apiParams) params += `&appid=${OPENWEATHER_KEY}`;

  const url = root + params;

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
