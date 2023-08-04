import fetch from "node-fetch";
import { oneEntity } from "../utils/oneEntity.js";

export const getParks = async (req, res) => {

  // Get the state abbreviation from the request query params.
  let abbrState = await oneEntity(req.query.abbrState);

  // The RapidAPI key and the NPS API key are stored in the environment variables.
  const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
  const NPS_API = process.env.NPS_API;
  const PARKS_HOST = process.env.PARKS_HOST;

  // The URL of the RapidAPI endpoint.
  const host = `${PARKS_HOST}?stateCode=${abbrState}`;

  // The HTTP request options.
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": `${NPS_API}`,
      "X-RapidAPI-Key": `${X_RAPIDAPI_KEY}`,
      "X-RapidAPI-Host": "jonahtaylor-national-park-service-v1.p.rapidapi.com",
      "User-Agent": "PackRat",
    },
  };

  // Make the HTTP request and get the JSON response.
  await fetch(host, options)
    .then((res) => res.json())
    .then((json) => {
      res.send(json);
    })
    .catch(() =>
      res.send({ message: "Error retrieving park data from RapidAPI" })
    );
};
