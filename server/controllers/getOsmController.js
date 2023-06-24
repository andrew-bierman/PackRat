import osmtogeojson from "osmtogeojson";
import axios from "axios";
import Way from "../models/osm/wayModel.js";
import Node from "../models/osm/nodeModel.js";
import mongoose from "mongoose";
import { findOrCreateMany } from "../utils/osmFunctions/modelHandlers.js";

export const getOsm = async (req, res) => {
  console.log("req", req); // log the request body to see what it looks like

  const overpassUrl = process.env.OSM_URI;

  const activityTypeTags = {
    hiking: '["highway"~"path|footway"]',
    skiing: '["piste:type"~"downhill|nordic"]',
    climbing: '["sport"="climbing"]',
    cycling: '["highway"~"cycleway(:left|:right)?"]',
    canoeing: '["waterway"~"riverbank|canal|stream"]',
    horseback_riding: '["highway"="bridleway"]',
    kayaking: '["waterway"~"riverbank|canal|stream|rapids|waterfall"]',
    rock_climbing: '["natural"="cliff"]',
    sailing: '["waterway"~"riverbank|canal|harbour|basin"]',
  };

  async function formatOverpassQuery(activityType, startPoint, endPoint) {
    const tagString = activityTypeTags[activityType];
    const overpassQuery = `[out:json][timeout:25];
          (
            way${tagString}(${startPoint.latitude},${startPoint.longitude},${endPoint.latitude},${endPoint.longitude});
          );
          (._;>;);
          out skel qt;`;

    return overpassQuery;
  }

  try {
    const { activityType, startPoint, endPoint } = req.body;

    if (!activityType || !startPoint || !endPoint) {
      throw new Error("Invalid request parameters");
    }

    const overpassQuery = await formatOverpassQuery(
      activityType,
      startPoint,
      endPoint
    );

    // console.log("overpassQuery", overpassQuery);

    const response = await axios.post(overpassUrl, overpassQuery, {
      headers: { "Content-Type": "text/plain" },
    });

    // console.log("response", response);

    if (response.status === 200) {
      const responseFormat = response.data;
      const geojsonData = osmtogeojson(responseFormat);
      res.send(geojsonData);
    } else {
      console.log(response.status, response.statusText);
      res.send({ message: "Error processing Overpass Data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving Overpass Data" });
  }
};

export const getPhotonResults = async (req, res) => {
  const { searchString } = req.query;

  if (!searchString) {
    res.status(400).send({ message: "Invalid request parameters" });
    return; // Return early to avoid further execution
  }

  let params = {
    q: searchString,
    osm_tag: ["highway:footway", "highway:cycleway", "place"],
    // osm_tag: "highway:footway",
    // osm_tag: "highway:cycleway",
    // osm_tag: "place",
  };

  const queryString = Object.entries(params)
    .flatMap(([key, values]) =>
      Array.isArray(values)
        ? values.map((val) => `${key}=${val}`)
        : `${key}=${values}`
    )
    .join("&");

  // console.log("queryString", queryString);

  try {
    const response = await axios.get(
      `https://photon.komoot.io/api/?${queryString}`
    );

    // console.log("response", response);

    const resultsArray = response.data.features;

    res.send(resultsArray);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving Photon results" });
  }
};

const updateDatabaseWithGeoJSONDataFromOverpass = async (data) => {
  try {

    if(!data) {
      throw new Error("No data provided");
    }

    const results = await findOrCreateMany(Way, data.features);

    console.log("results", results);

  } catch (error) {
    console.error(error);
  }
};

export const getTrailsOSM = async (req, res) => {
  try {
    // set default values for lat, lon, and radius
    const { lat = 45.5231, lon = -122.6765, radius = 50000 } = req.query;

    if (!lat || !lon || !radius) {
      res.status(400).send({ message: "Invalid request parameters" });
      return; // Return early to avoid further execution
    }

    const overpassUrl = process.env.OSM_URI;

    const overpassQuery = `
      [out:json][timeout:25];
      (
        way["highway"~"footway"]["name"](around:${radius},${lat},${lon});
      );
      (._;>;);
      out tags geom qt;
      `;

    const response = await axios.post(overpassUrl, overpassQuery, {
      headers: { "Content-Type": "text/plain" },
    });

    const geojsonData = osmtogeojson(response.data);

    updateDatabaseWithGeoJSONDataFromOverpass(geojsonData);

    res.send(geojsonData);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Error retrieving Trails OSM results" });
  }
};

export const getParksOSM = async (req, res) => {
  try {
    const { lat = 45.5231, lon = -122.6765, radius = 50000 } = req.query;

    if (!lat || !lon || !radius) {
      res.status(400).send({ message: "Invalid request parameters" });
      return; // Return early to avoid further execution
    }

    const overpassUrl = process.env.OSM_URI;

    const overpassQuery = `
      [out:json][timeout:25];
      (
        way["leisure"~"park|nature_reserve|garden|recreation_ground"](around:${radius},${lat},${lon});
      );
      (._;>;);
      out tags geom qt;
      `;

    const response = await axios.post(overpassUrl, overpassQuery, {
      headers: { "Content-Type": "text/plain" },
    });

    const geojsonData = osmtogeojson(response.data);

    updateDatabaseWithGeoJSONDataFromOverpass(geojsonData);

    res.send(geojsonData);
    
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Error retrieving Parks OSM results" });
  }
};
