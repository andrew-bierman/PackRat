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
  console.log("properties in propertiesToTags", properties);
  const tags = {};
  for (let [k, v] of Object.entries(properties)) {
    tags[k] = v;
  }
  return tags;
}

export async function createInstanceFromCoordinates([lon, lat]) {
  const instance = new Node({ lon, lat });
  await instance.save();
  return instance._id;
}

export async function coordinatesToInstances(coordinates) {
  return await Promise.all(
    coordinates.map((coordinate) => createInstanceFromCoordinates(coordinate))
  );
}

export async function handleGeometry(geometry) {
  if (geometry.type === "Point") {
    return [await createInstanceFromCoordinates(geometry.coordinates)];
  } else if (geometry.type === "LineString") {
    return await coordinatesToInstances(geometry.coordinates);
  } else {
    // handle other geometry types if needed
  }
}

export async function fromOSM(Model, data) {
  const { type, id } = extractIdAndType(data.id);

  const instanceData = {
    osm_id: id,
    osm_type: type,
    tags: propertiesToTags(data.tags),
    updated_at: data.timestamp,
  };

  // Find or create nodes/ways/relations
  const ids = data.nodes.map((node) => node.id);
  const instances = await Model.findOrCreateMany(ids, data.nodes);

  // Add nodes/ways/relations to instance
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

  // Convert coordinates to nodes/ways/relations
  instance.nodes = await handleGeometry(Model, geoJSON.geometry);

  // Set the GeoJSON representation
  if (isGeoJSONFormat(geoJSON)) {
    instance.geoJSON = geoJSON;
  } else {
    console.error("geoJSON is not in GeoJSON format");
  }
  // instance.geoJSON = toGeoJSON(Model, instance);

  // Save and return the new instance
  await instance.save();
  return instance;
}

export function toGeoJSON(Model, instance) {
  console.log("toGeoJSON instance", instance);

  if(!instance) {
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

  instance.nodes.forEach((node) => {
    const copiedNode = { ...node }; // Create a shallow copy of the node
    geoJSON.geometry.coordinates.push([copiedNode.lon, copiedNode.lat]);
  });

  geoJSON.id = instance.osm_type + "/" + instance.osm_id;
  return geoJSON;
}

export async function findOrCreateMany(Model, data) {
  const instances = [];

  for (let element of data) {
    // Extract OSM ID
    const id = element.id
      ? Number(element.id.split("/")[1])
      : Number(element.properties.id.split("/")[1]);
    const type = element.id
      ? element.id.split("/")[0]
      : element.properties.id.split("/")[0];
    const foundInstance = await Model.findOne({ osm_id: id, osm_type: type });

    if (foundInstance) {
      if (isGeoJSONFormat(element)) {
        // update existing instance if data is in GeoJSON format
        foundInstance.tags = propertiesToTags(element.properties);
        foundInstance.nodes = await handleGeometry(Model, element.geometry);
        foundInstance.geoJSON = element;
        await foundInstance.save();
      }
      instances.push(foundInstance);
    } else {
      let newInstance;

      if (isOSMFormat(element)) {
        // create new instance from OSM data
        console.log("findOrCreateMany, isOSM element", element);
        newInstance = await fromOSM(Model, element);
      } else if (isGeoJSONFormat(element)) {
        // create new instance from GeoJSON data
        newInstance = await fromGeoJSON(Model, element);
      }

      instances.push(newInstance);
    }
  }

  return instances;
}
