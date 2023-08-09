import osmtogeojson from "osmtogeojson";
import axios from "axios";
import Way from "../models/osm/wayModel.js";
import Node from "../models/osm/nodeModel.js";
import mongoose from "mongoose";
// import { findOrCreateMany, findOrCreateOne, ensureIdProperty, ensureModelProperty, checkandsave, processElement } from "../utils/osmFunctions/modelHandlers.js";
import {
  findOrCreateMany,
  findOrCreateOne,
  ensureIdProperty,
  ensureModelProperty,
  processElement,
} from "../utils/osmFunctions/modelHandlers.js";
import { isGeoJSONFormat } from "../utils/osmFunctions/dataFormatters.js";

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
      for (let obj of geojsonData.features) {
        processElement(obj)
      }
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

  console.log("queryString----", queryString);

  try {
    const response = await axios.get(
      `https://photon.komoot.io/api/?${queryString}`
    );

    // console.log("response", response);

    const resultsArray = response.data.features;
    
    for (let obj of resultsArray) {
      let checkJSONFormat = isGeoJSONFormat(obj);
      if(checkJSONFormat){
        let checkensureIdProperty = ensureIdProperty(obj);
        let checkensureModelProperty = ensureModelProperty(checkensureIdProperty)
  
        checkandsave(checkensureModelProperty,checkensureIdProperty.properties.osm_id,checkensureIdProperty.properties.osm_type,checkensureIdProperty);
      }
    }

    res.send(resultsArray);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving Photon results" });
  }
};

const updateDatabaseWithGeoJSONDataFromOverpass = async (data) => {
  try {
    if (!data) {
      throw new Error("No data provided");
    }

    // TEMPORARY: Commenting due to performance issues
    // const results = await findOrCreateMany(Way, data.features);

    // console.log("results", results);
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
      out tags geom qt;
      `;

    const response = await axios.post(overpassUrl, overpassQuery, {
      headers: { 'Content-Type': 'text/plain' },
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
    console.log("geojsonData==============", geojsonData);

    updateDatabaseWithGeoJSONDataFromOverpass(geojsonData);

    res.send(geojsonData);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Error retrieving Parks OSM results" });
  }
};

export const postSingleGeoJSON = async (req, res) => {
  // console.log("req.body", req.body)
  console.log("in postSingleGeoJSON");
  const geojson = req.body;

  if (!geojson || !isGeoJSONFormat(geojson)) {
    res.status(400).send({ message: "Invalid or missing geoJSON" });
    return; // Return early to avoid further execution
  }

  try {
    const data = geojson;
    console.log("data", data);
    const processedElement = ensureIdProperty(data);
    const Model = ensureModelProperty(processedElement);
    console.log("processedElement", processedElement);
    const newInstance = await findOrCreateOne(Model, processedElement);
    res.status(201).json({
      status: "success",
      data: {
        newInstance,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const postCollectionGeoJSON = async (req, res) => {
  console.log("in postGeoJSON");
  const geojson = req.body;

  if (!geojson || !isGeoJSONFormat(geojson)) {
    res.status(400).send({ message: "Invalid or missing geoJSON" });
    return; // Return early to avoid further execution
  }

  try {
    // Check if the GeoJSON is a FeatureCollection
    if (geojson.type === "FeatureCollection") {
      const data = geojson.features;
      console.log("data", data);
      const processedElements = data.map((element) => ensureIdProperty(element));
      const Models = processedElements.map((element) =>
        ensureModelProperty(element)
      );
      console.log("processedElements", processedElements);
      const newInstances = await Promise.all(
        Models.map((Model, index) => findOrCreateOne(Model, processedElements[index]))
      );
      res.status(201).json({
        status: "success",
        data: {
          newInstances,
        },
      });
    } else {
      // Handle single feature
      const processedElement = ensureIdProperty(geojson);
      const Model = ensureModelProperty(processedElement);
      console.log("processedElement", processedElement);
      const newInstance = await findOrCreateOne(Model, processedElement);
      res.status(201).json({
        status: "success",
        data: {
          newInstance,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};


export const getDestination = async (req, res) => {
  try {
    const id = req.params.id;

    let destination = await Way.findById(id);

    // If not found in Way, search in Node
    if (!destination) {
      destination = await Node.findById(id);
    }

    if (!destination) {
      return res.status(404).json({
        status: "fail",
        message: "No destination found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        destination: destination,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getPhotonDetails = async (req, res) => {
  let { id, type } = req.params;

  if (!id || !type) {
    res.status(400).send({ message: "Invalid request parameters" });
    return; // Return early to avoid further execution
  }

  type = type.toLowerCase(); // Standardize osm_type to be lowercase

  switch (type) {
    case "way":
    case "w":
      type = "way";
      break;
    case "node":
    case "n":
      type = "node";
      break;
    case "relation":
    case "r":
      type = "relation";
      break;
    default:
      res.status(400).send({ message: "Invalid request parameters" });
      return; // Return early to avoid further execution
  }

  const overpassUrl = process.env.OSM_URI;

  const overpassQuery = `
  [out:json][timeout:25];
  ${type}(${id});
  (._;>;);
  out body;
  `;

  console.log("overpassQuery", overpassQuery);

  try {
    const response = await axios.post(overpassUrl, overpassQuery, {
      headers: { "Content-Type": "text/plain" },
    });

    // console.log("response", response);

    const geojsonData = osmtogeojson(response.data);

    // await updateDatabaseWithGeoJSONDataFromOverpass(geojsonData);

    res.send(geojsonData);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving Photon details" });
  }
};

export const getNominatimDetails = async (req, res) => {
  const { lat, lon, place_id } = req.query;
  
  let nominatimUrl = "";

  if (place_id) {
    nominatimUrl = `https://nominatim.openstreetmap.org/lookup?format=json&osm_ids=${place_id}&addressdetails=1`;
  } else if (lat && lon) {
    nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
  } else {
    res.status(400).send({ message: "Invalid request parameters" });
    return; // Return early to avoid further execution
  }

  try {
    const response = await axios.get(nominatimUrl);

    if (response.status === 200) {
      res.send(response.data);
    } else {
      console.log(response.status, response.statusText);
      res.send({ message: "Error processing Nominatim Data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving Nominatim Data" });
  }
};

export const getEnhancedPhotonDetails = async (req, res) => {
  let { id, type } = req.params;

  if (!id || !type) {
    res.status(400).send({ message: "Invalid request parameters" });
    return; // Return early to avoid further execution
  }

  type = type.toLowerCase(); // Standardize osm_type to be lowercase

  switch (type) {
    case "way":
    case "w":
      type = "way";
      break;
    case "node":
    case "n":
      type = "node";
      break;
    case "relation":
    case "r":
      type = "relation";
      break;
    default:
      res.status(400).send({ message: "Invalid request parameters" });
      return; // Return early to avoid further execution
  }

  const overpassUrl = process.env.OSM_URI;
  const overpassQuery = `
  [out:json][timeout:25];
  ${type}(${id});
  (._;>;);
  out body;
  `;

  console.log("overpassQuery", overpassQuery);

  const nominatimUrl = `https://nominatim.openstreetmap.org/lookup?format=json&osm_ids=${type[0]}${id}&addressdetails=1`;

  try {
    const overpassPromise = axios.post(overpassUrl, overpassQuery, {
      headers: { "Content-Type": "text/plain" },
    });

    const nominatimPromise = axios.get(nominatimUrl);

    const [overpassResponse, nominatimResponse] = await Promise.all([
      overpassPromise,
      nominatimPromise,
    ]);

    const geojsonData = osmtogeojson(overpassResponse.data);

    if (overpassResponse.status === 200 && nominatimResponse.status === 200) {
      // Assuming nominatimResponse.data is an array of objects
      const nominatimData = nominatimResponse.data

      console.log("nominatimData", nominatimData)

      // Add Nominatim data into each feature properties of the GeoJSON
      geojsonData.features.forEach((feature) => {
        feature.properties = {
          ...feature.properties,
          ...nominatimData,
        };
      });

      res.send({
        photon: geojsonData,
      });
    } else {
      console.log(overpassResponse.status, overpassResponse.statusText);
      console.log(nominatimResponse.status, nominatimResponse.statusText);
      res.send({ message: "Error processing data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving data" });
  }
};
