import { api } from "../constants/api";

export const getWeather = async (lat, lon, state) => {
  console.log('data received in api - ', lat, lon, state)
  let weatherObject = {};

  let params = `?`;

  if (lat) params += `lat=${lat}`;
  if (lon) params += `&lon=${lon}`;

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
