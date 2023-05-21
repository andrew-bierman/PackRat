import fetch from "node-fetch";

export const getWeatherWeek = async (req, res) => {
  const root = process.env.WEATHER_WEEK_URL;
  const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;
  let params = `?`;
  const latParams = req.query.lat;
  const lonParams = req.query.lon;
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
      res.send(json);
    })
    .catch(() => {
      res.send({
        message: "Error retrieving weekly weather data from OpenWeather",
      });
    });
};

export const getWeather = async (req, res) => {
  console.log(req.query);

  // getting from lat lon from quries
  let params = `?`;
  const latParams = req.query.lat;
  const lonParams = req.query.lon;
  const unitParams = "imperial";
  const apiParams = true;

  // extending parameters
  if (latParams) params += `lat=${latParams}`;
  if (lonParams) params += `&lon=${lonParams}`;
  if (unitParams) params += `&units=${unitParams}`;
  if (apiParams) params += `&appid=${process.env.OPENWEATHER_KEY}`;

  // getting weather info from api
  try {
    const request = await fetch(process.env.WEATHER_URL + params);
    const response = await request.json();
    console.log(response);
    res.send(response);
  } catch (error) {
    res.send({ message: "Error retrieving weather data from OpenWeather" });
  }
};
