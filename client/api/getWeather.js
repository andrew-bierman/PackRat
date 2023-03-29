// import { OpenWeather_Key } from "../constants/api";
import { OPENWEATHER_KEY } from "@env";

export const getWeather = async (lat, lon, state) => {
  let weatherObject = {};

  const root = "https://api.openweathermap.org/data/2.5/weather";

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
      // for (const key of Object.keys(json)) {
      //     const {weatherObject[key]} = json[key]
      // }

      // Object.values(json).forEach(item => {
      //     weatherArray.push(item)
      // })
    })
    .catch((err) => {
      console.error("error:" + err);
    });

  weatherObject.state = state;
  return weatherObject;
};
