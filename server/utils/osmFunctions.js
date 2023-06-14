import Way from "../models/osm/wayModel.js";
import Node from "../models/osm/nodeModel.js";
import mongoose from "mongoose";

const extractIdAndType = (string) => {
  if (string.includes("/")) {
    let [type, idString] = string.split("/");

    const idNumber = Number(idString);

    return { type, id: idNumber };
  } else {
    return { type: "node", id: string };
  }
};

// Determine if data is in OSM format
export function isOSMFormat(data) {
  return data && data.type && data.id && data.tags && data.nodes;
}

// Determine if data is in GeoJSON format
export function isGeoJSONFormat(data) {
  return data && data.type === "Feature" && data.geometry && data.properties;
}

export function propertiesToTags(properties) {
  if (!properties) {
    console.error("properties is undefined or null");
    return {};
  }
  if (typeof properties !== "object" || properties === null) {
    throw new Error("Properties should be an object");
  }
  console.log("properties in propertiesToTags", properties);
  const tags = {};
  for (let [k, v] of Object.entries(properties)) {
    tags[k] = v;
  }
  return tags;
}

export async function createInstanceFromCoordinates(Model, [lon, lat]) {
  if (typeof lon !== "number" || typeof lat !== "number") {
    console.error("Invalid coordinate format");
    return null;
  }

  const instance = new Model({ lon, lat });
  await instance.save();
  return instance._id;
}

export async function coordinatesToInstances(Model, coordinates) {
    if (!Array.isArray(coordinates)) {
      console.error("Coordinates is not an array");
      return [];
    }
  
    if (coordinates.length === 0) {
      return [];
    }
  
    const isNestedArray = Array.isArray(coordinates[0]);
  
    if (!isNestedArray) {
      // Check if we have coordinates or an id
      if (typeof coordinates[0] === "number") {
        return [await createInstanceFromCoordinates(Model, coordinates)];
      } else {
        return coordinates;
      }
    }
  
    if (typeof coordinates[0][0] === "number") {
      return await Promise.all(
        coordinates.map((coordinate) =>
          createInstanceFromCoordinates(Model, coordinate)
        )
      );
    } else {
      return coordinates;
    }
  }
  

export async function handleGeometry(Model, geometry) {
  console.log("handleGeometry");
  console.log("handleGeometry geometry", geometry);

  if (!geometry || !Array.isArray(geometry.coordinates)) {
    console.error("geometry is undefined or not an array");
    return [];
  }

  const nodes = [];

  if (geometry.type === "Point") {
    const instance = await createInstanceFromCoordinates(
      Model,
      geometry.coordinates
    );
    nodes.push(instance._id);
  } else {
    for (const coords of geometry.coordinates) {
      const instance = await createInstanceFromCoordinates(Model, coords);
      nodes.push(instance._id);
    }
  }

  return nodes;
}

export function handleGeoJSONGeometry(geometry) {
  console.log("handleGeometry");
  console.log("handleGeometry geometry", geometry);

  if (!geometry || !Array.isArray(geometry.coordinates)) {
    console.error("geometry is undefined or not an array");
    return [];
  }

  const nodes = [];

  if (geometry.type === "Point") {
    nodes.push(geometry.coordinates);
  } else {
    for (const coords of geometry.coordinates) {
      nodes.push(coords);
    }
  }

  return nodes;
}

export async function fromOSM(Model, data) {
  const { type, id } = extractIdAndType(data.id);

  const instanceData = {
    osm_id: id,
    osm_type: type,
    tags: propertiesToTags(data.tags),
    updated_at: data.timestamp,
  };

  // Find or create nodes
  const ids = data.nodes.map((node) => node.id);
  const instances = await Node.findOrCreateMany(ids, data.nodes);

  // Add nodes to instance
  instanceData.nodes = instances.map((instance) => instance._id);

  // Create instance
  const newInstance = await Model.create(instanceData);

  return newInstance;
}

export async function fromGeoJSON(Model, geoJSON) {
  console.log("fromGeoJSON");
  console.log("fromGeoJSON geoJSON", geoJSON);
  console.log("fromGeoJSON Model", Model);

  const instance = new Model();
  instance.tags = new Map();

  // Extract OSM ID and type from properties, if available
  if (geoJSON.id) {
    const { type, id } = extractIdAndType(geoJSON.id);
    instance.osm_type = type;
    instance.osm_id = id;
  }

  // Convert properties to tags
  instance.tags = propertiesToTags(geoJSON.properties || {});

  // Convert coordinates to nodes
  instance.nodes = await coordinatesToInstances(
    Node,
    handleGeoJSONGeometry(geoJSON.geometry)
  );

  // Set the GeoJSON representation
  if (isGeoJSONFormat(geoJSON)) {
    instance.geoJSON = geoJSON;
  } else {
    console.error("geoJSON is not in GeoJSON format");
  }

  // Save and return the new instance
  await instance.save();
  return instance;
}

export async function toGeoJSON(Model, instance) {
  console.log("toGeoJSON instance", instance);

  if (!instance) {
    console.error("instance is undefined or null");
    return {};
  }

  const geoJSON = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  };

  if (instance.tags) {
    geoJSON.properties = propertiesToTags(instance.tags);
  }

  // Retrieve the Node documents from the database
  const nodes = await Node.find({ _id: { $in: instance.nodes } }).exec();

  nodes.forEach((node) => {
    // assuming nodes are already saved and their ids are stored in `nodes`
    // we can fetch the node data here using findById or leave it as it is if id is enough
    geoJSON.geometry.coordinates.push([node.lat, node.lon]);
  });

  return geoJSON;
}

// Mapping of types to Models
const modelMappingFunc = (type) => {
    switch (type) {
        case "node":
            return Node;
        case "way":
            return Way;
        case "relation":
            // return Relation;
        default:
            return null;
    }
};
  
  export async function findOrCreateMany(Model = Way, data) {

    // Check if data is iterable
    if (!Array.isArray(data)) {
        console.error("Data is not iterable");
        console.log("Data", data)
        throw new Error("Data is not iterable, cannot proceed."); // This line is added
      }

    const instances = [];
  
    for (let element of data) {
      // Extract OSM ID and type
      const id = element.id
        ? Number(element.id.split("/")[1])
        : Number(element.properties.id.split("/")[1]);
      const type = element.id
        ? element.id.split("/")[0]
        : element.properties.id.split("/")[0];
  
      // Retrieve corresponding Model
      const Model = modelMappingFunc(type);
  
      if (!Model) {
        console.error(`Invalid type: ${type}`);
        continue;
      }
  
      const foundInstance = await Model.findOne({ osm_id: id, osm_type: type });
  
      console.log("findOrCreateMany, foundInstance", foundInstance);
      console.log("findOrCreateMany, osm_id", id);
      console.log("findOrCreateMany, osm_type", type);
  
      if (foundInstance) {
        if (isGeoJSONFormat(element)) {
          console.log("findOrCreateMany, isGeoJSON element", element);
          foundInstance.updated_at = element.properties.timestamp;
          foundInstance.osm_id = id;
          foundInstance.osm_type = type;
          foundInstance.tags = propertiesToTags(element.properties);
          foundInstance.nodes = handleGeoJSONGeometry(element.geometry);
          foundInstance.geoJSON = element;
  
          console.log(
            "findOrCreateMany, foundInstance before save ------",
            foundInstance
          );
  
          await foundInstance.save();
        }
        instances.push(foundInstance);
      } else {
        let newInstance;
  
        if (isOSMFormat(element)) {
          console.log("findOrCreateMany, isOSM element", element);
          newInstance = await fromOSM(Model, element);
        } else if (isGeoJSONFormat(element)) {
          newInstance = await fromGeoJSON(Model, element);
        }
  
        instances.push(newInstance);
      }
    }
  
    return instances;
  }
  