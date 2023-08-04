import fetch from "node-fetch";
import { oneEntity } from "../utils/oneEntity.js";

export const getParks = async (req, res) => {
  try {
    const abbrState = req.params.abbrState;

    if (!abbrState) {
      return res.status(400).json({ message: "State abbreviation is required" });
    }

    const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
    const NPS_API = process.env.NPS_API;
    const PARKS_HOST = process.env.PARKS_HOST;

    const host = `${PARKS_HOST}?stateCode=${abbrState}`;

    const options = {
      method: "GET",
      headers: {
        "X-Api-Key": NPS_API,
        "X-RapidAPI-Key": X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jonahtaylor-national-park-service-v1.p.rapidapi.com",
        "User-Agent": "PackRat",
      },
    };

    const response = await fetch(host, options);

    if (!response.ok) {
      return res.status(500).json({ message: "Error retrieving park data from RapidAPI" });
    }

    const jsonData = await response.json();
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving park data from RapidAPI", error: error.message });
  }
};
