import fetch from "node-fetch";

export const getWeatherWeek = async (req, res) => {
    const root = process.env.WEATHER_WEEK_URL
    const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY
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
            res.send(json)
        }).catch(() => {
            res.send({ message: "Went wrong" });
        });
};

export const getWeather = async (req, res) => {

    const root = process.env.WEATHER_URL
    const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY

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
            res.send(json)
        }).catch(() => {
            res.send({ message: "Went wrong" });
        });
};