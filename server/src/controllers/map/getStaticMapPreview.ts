import express from "express";
import axios from "axios";
import { MAPBOX_ACCESS_TOKEN } from "../../config";

export default async function getStaticMapPreview(
  req: express.Request,
  res: express.Response
) {
  try {
    const queryParams = Object.entries(req.query).reduce(
      (acc, [key, val], i, arr) =>
        `${acc}${key}=${val}${i == arr.length - 1 ? "" : "&"}`,
      ""
    );
    const { data } = await axios.get(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${req.originalUrl
        .replace("/map/static/", "")
        .replace(
          "?" + queryParams,
          ""
        )}?access_token=${MAPBOX_ACCESS_TOKEN}&${queryParams}`,
      { responseType: "arraybuffer" }
    );

    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (error) {
    console.error("Error fetching static map preview:", error);
    res.status(500).send("Internal server error");
  }
}
