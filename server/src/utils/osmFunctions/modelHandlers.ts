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

export async function fromOSM(Model: any, data: any) {
  const { type, id } = extractIdAndType(data.id);

  const instanceData: any = {
    osm_id: id,
    osm_type: type,
    tags: propertiesToTags(data.tags),
    updated_at: data.timestamp,
  };

  // Find or create nodes
  const ids = data.nodes.map((node: any) => node.id);
  const instances = await Node.findOrCreateMany(ids, data.nodes);

  // Add nodes to instance
  instanceData.nodes = instances.map((instance: any) => instance._id);

  // Create instance
  const newInstance = await Model.create(instanceData);

  return newInstance;
}

export async function fromGeoJSON(Model: any, geoJSON: any) {
  // console.log("fromGeoJSON");
  // console.log("fromGeoJSON geoJSON", geoJSON);
  // console.log("fromGeoJSON Model", Model);

  const instance = new Model();
  instance.tags = new Map();

  // Extract OSM ID and type from properties, if available
  if (geoJSON.id) {
    const { type, id } = extractIdAndType(geoJSON.id);
    instance.osm_type = type.toLowerCase(); // Standardize osm_type to be lowercase
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

export async function toGeoJSON(Model: any, instance: any) {
  // console.log("toGeoJSON instance", instance);

  if (!instance) {
    console.error("instance is undefined or null");
    return {};
  }

  const geoJSON: any = {
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

  nodes.forEach((node: any) => {
    // assuming nodes are already saved and their ids are stored in `nodes`
    // we can fetch the node data here using findById or leave it as it is if id is enough
    geoJSON.geometry.coordinates.push([node.lat, node.lon]);
  });

  return geoJSON;
}

// Mapping of types to Models
const modelMappingFunc = (type: string) => {
  console.log("modelMappingFunc type", type)
  switch (type) {
    case "node":
    case "n":   // In case 'n' is sent
    case "N":   // In case 'N' is sent
      return Node;
    case "way":
    case "w":   // Map 'W' to Way
    case "W":   // Map 'W' to Way
      return Way;
    case "relation":
    case "r":   // In case 'r' is sent
    case "R":   // In case 'R' is sent
      return Relation;
    default:
      return null;
  }
};

export function findExisting(Model: any, id: any, type: string) {
  return Model.findOne({ osm_id: id, osm_type: type });
}

export async function updateInstanceFromGeoJSON(instance: any, geoJSON: any) {
  instance.updated_at = geoJSON.properties.timestamp;
  instance.tags = propertiesToTags(geoJSON.properties);
  instance.nodes = await coordinatesToInstances(
    Node,
    handleGeoJSONGeometry(geoJSON.geometry)
  );
  instance.geoJSON = geoJSON;
  return instance;
}

export function createNewInstance(Model: any, element: any) {
  if (isOSMFormat(element)) {
    return fromOSM(Model, element);
  } else if (isGeoJSONFormat(element)) {
    return fromGeoJSON(Model, element);
  }
  throw new Error("Element is neither in OSM or GeoJSON format.");
}

export function ensureIdProperty(element: any) {
  if (!element.id && element.properties && element.properties.osm_id) {
    // Create 'id' in the format 'type/id'
    let { osm_type, osm_id } = element.properties;

    if(osm_type === 'N') {
      osm_type = 'node';
    } else if(osm_type === 'W') {
      osm_type = 'way';
    } else if(osm_type === 'R') {
      osm_type = 'relation';
    }

    element.id = `${osm_type}/${osm_id}`;
  }

  if (!element.type && element.properties && element.properties.osm_type) {
    // Create 'type' from 'osm_type'
    element.type = element.properties.osm_type;
  }

  return element;
}

export function ensureModelProperty(element: any) {
  // Convert the osm_type to lowercase if it's a string
  const osmType =
    typeof element.properties.osm_type === "string"
      ? element.properties.osm_type.toLowerCase()
      : element.properties.osm_type;
  const ModelForElement = modelMappingFunc(osmType);
  if (!ModelForElement) {
    console.error(`Invalid type: ${element.properties.osm_type}`);
    return;
  }
  return ModelForElement;
}

export async function processElement(element: any) {
  // Extract OSM ID and type
  const id = element.id
    ? Number(element.id.split("/")[1])
    : Number(element.properties.osm_id);
  const type = element.id
    ? element.id.split("/")[0]
    : element.properties.osm_type;

  // Retrieve corresponding Model
  const ModelForElement = modelMappingFunc(type);
  if (!ModelForElement) {
    console.error(`Invalid type: ${type}`);
    return;
  }


  let instance = await findExisting(ModelForElement, id, type);
  if (instance) {
    if (isGeoJSONFormat(element)) {
      instance = await updateInstanceFromGeoJSON(instance, element);
      await instance.save();
    }
  } else {
    instance = await createNewInstance(ModelForElement, element);
  }
  return instance;
}

export async function findOrCreateOne(Model = Way, element: any) {
  return processElement(element);
}

export async function findOrCreateMany(Model = Way, data: any) {
  // Check if data is iterable
  if (!Array.isArray(data)) {
    throw new Error("Data is not iterable, cannot proceed.");
  }

  const instances = [];

  for (let element of data) {
    const instance = await processElement(element);
    if (instance) {
      instances.push(instance);
    }
  }
  return instances;
}
