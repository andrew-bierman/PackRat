import axios from "axios";

export const getWeatherWeek = async (req, res) => {
  const root = process.env.WEATHER_WEEK_URL;
  const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;
  const latParams = req.query.lat;
  const lonParams = req.query.lon;
  const unitParams = "imperial";
  const apiParams = true;

  let params = `?`;
  if (latParams) params += `lat=${latParams}`;
  if (lonParams) params += `&lon=${lonParams}`;
  if (unitParams) params += `&units=${unitParams}`;
  if (apiParams) params += `&appid=${OPENWEATHER_KEY}`;

  const url = root + params;

  console.log("url", url);

  try {
    const response = await axios.get(url);
    // console.log(response.data);
    res.send(response.data);
  } catch (error) {
    res.status(404).send({
      message: "Error retrieving weather data from OpenWeather",
      error,
    });
  }
};

export const getWeather = async (req, res) => {
  const root = process.env.WEATHER_URL;
  const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;
  const latParams = req.query.lat;
  const lonParams = req.query.lon;
  const unitParams = "imperial";
  const apiParams = true;

  let params = `?`;
  if (latParams) params += `lat=${latParams}`;
  if (lonParams) params += `&lon=${lonParams}`;
  if (unitParams) params += `&units=${unitParams}`;
  if (apiParams) params += `&appid=${OPENWEATHER_KEY}`;

  const url = root + params;

  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    // send back error message
    res
      .status(404)
      .send({ message: "Error retrieving weather data from OpenWeather" });
    // res.send({ message: "Error retrieving weather data from OpenWeather" });
  }
};