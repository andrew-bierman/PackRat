import axios from "axios";
import express from "express";

const router = express.Router();

router.get("/weather/week/:lat/:lon", async (req, res) => {
  const root = process.env.WEATHER_WEEK_URL;
  const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;
  const { lat, lon } = req.params;
  const unitParams = "imperial";
  const apiParams = true;

  const url = `${root}?lat=${lat}&lon=${lon}&units=${unitParams}&appid=${OPENWEATHER_KEY}`;

  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving weekly weather data from OpenWeather",
      error,
    });
  }
});

router.get("/weather/:lat/:lon", async (req, res) => {
  const root = process.env.WEATHER_URL;
  const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;
  const { lat, lon } = req.params;
  const unitParams = "imperial";
  const apiParams = true;

  const url = `${root}?lat=${lat}&lon=${lon}&units=${unitParams}&appid=${OPENWEATHER_KEY}`;

  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving current weather data from OpenWeather",
      error,
    });
  }
});

export default router;
