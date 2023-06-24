import Way from "../../models/osm/wayModel.js";
import Node from "../../models/osm/nodeModel.js";
import Relation from "../../models/osm/relationModel.js";

import {
  createInstanceFromCoordinates,
  coordinatesToInstances,
  handleGeometry,
  handleGeoJSONGeometry,
} from "./coordinateHandlers.js";
import {
  isOSMFormat,
  isGeoJSONFormat,
  propertiesToTags,
  extractIdAndType,
} from "./dataFormatters.js";

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
    return Relation;
    default:
      return null;
  }
};

export function findExisting(Model, id, type) {
  return Model.findOne({ osm_id: id, osm_type: type });
}

export async function updateInstanceFromGeoJSON(instance, geoJSON) {
  instance.updated_at = geoJSON.properties.timestamp;
  instance.tags = propertiesToTags(geoJSON.properties);
  instance.nodes = await coordinatesToInstances(
    Node,
    handleGeoJSONGeometry(geoJSON.geometry)
  );
  instance.geoJSON = geoJSON;
  return instance;
}

export function createNewInstance(Model, element) {
  if (isOSMFormat(element)) {
    return fromOSM(Model, element);
  } else if (isGeoJSONFormat(element)) {
    return fromGeoJSON(Model, element);
  }
  throw new Error("Element is neither in OSM or GeoJSON format.");
}

export async function findOrCreateMany(Model = Way, data) {
  // Check if data is iterable
  if (!Array.isArray(data)) {
    throw new Error("Data is not iterable, cannot proceed.");
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

    let instance = await findExisting(Model, id, type);
    if (instance) {
      if (isGeoJSONFormat(element)) {
        instance = await updateInstanceFromGeoJSON(instance, element);
        await instance.save();
      }
    } else {
      instance = await createNewInstance(Model, element);
    }
    instances.push(instance);
  }
  return instances;
}
