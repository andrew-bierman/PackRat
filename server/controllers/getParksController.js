import fetch from "node-fetch";
import { oneEntity } from "../utils/oneEntity.js";

export const getParks = async (req, res) => {
    let abbrState = await oneEntity(req.query.abbrState)

    const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
    const NPS_API = process.env.NPS_API;
    const PARKS_HOST = process.env.PARKS_HOST

    const host = `${PARKS_HOST}?stateCode=${abbrState}`;

    const options = {
        method: "GET",
        headers: {
            "X-Api-Key": `${NPS_API}`,
            "X-RapidAPI-Key": `${X_RAPIDAPI_KEY}`,
            "X-RapidAPI-Host": "jonahtaylor-national-park-service-v1.p.rapidapi.com",
            "User-Agent": "PackRat",
        },
    };

    await fetch(host, options)
        .then((res) => res.json())
        .then((json) => {
            res.send(json)
        }).catch(() => res.send({ message: "Went wrong" }));
};

