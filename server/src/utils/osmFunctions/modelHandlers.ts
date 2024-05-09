import { Node } from '../../drizzle/methods/Node';
import { Way } from '../../drizzle/methods/Way';

import {
  createInstanceFromCoordinates,
  coordinatesToInstances,
  handleGeometry,
  handleGeoJSONGeometry,
} from './coordinateHandlers';
import {
  isOSMFormat,
  isGeoJSONFormat,
  propertiesToTags,
  extractIdAndType,
} from './dataFormatters';

export const modelMappingFunc = (type: string) => {
  switch (type) {
    case 'node':
    case 'n': // In case 'n' is sent
    case 'N': // In case 'N' is sent
      return new Node();
    case 'way':
    case 'w': // Map 'W' to Way
    case 'W': // Map 'W' to Way
      return new Way();
    // case 'relation':
    // case 'r': // In case 'r' is sent
    // case 'R': // In case 'R' is sent
    //   return 'Relation';
    default:
      return null;
  }
};

/**
 * Generates a new instance in the database from OpenStreetMap (OSM) data.
 * @prisma {PrismaClient} prisma - Prisma client.
 * @param {any} Model - the database model to create the instance in
 * @param {any} data - the OSM data to create the instance from
 * @return {Promise<any>} the newly created instance
 */
export async function fromOSM(Model: any, data: any) {
  const { type, id } = extractIdAndType(data.id);

  const instanceData: any = {
    osm_id: id,
    osm_type: type,
    tags: propertiesToTags(data.tags),
    updated_at: data.timestamp,
  };
  const nodeClass = new Node();
  // Find or create nodes
  const ids = data.nodes.map((node: any) => node.id);
  const instances = await Promise.all(
    data.nodes.map(async (node) => nodeClass.create(node)),
  );

  // Add nodes to instance
  instanceData.nodes = instances.map((instance: any) => instance.id);

  // Create instance
  const newInstance = await Model.create({ data: instanceData });

  return newInstance;
}

/**
 * Generates a new instance of a model from a GeoJSON object.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {any} Model - the model to create an instance of
 * @param {any} geoJSON - the GeoJSON object to generate the instance from
 * @return {Promise<any>} the newly created instance
 */
export async function fromGeoJSON(Model: any, geoJSON: any) {
  // console.log("fromGeoJSON");
  // console.log("fromGeoJSON geoJSON", geoJSON);
  // console.log("fromGeoJSON Model", Model);

  let osm_type;
  let osm_id;
  // Extract OSM ID and type from properties, if available
  if (geoJSON.id) {
    const extractedObj = extractIdAndType(geoJSON.id);
    osm_type = extractedObj.type;
    osm_id = extractedObj.id;
  }

  // Convert properties to tags
  const tags = propertiesToTags(geoJSON.properties || {});

  // Convert coordinates to nodes
  const nodes = await coordinatesToInstances(
    Model.node,
    handleGeoJSONGeometry(geoJSON.geometry),
  );
  let instanceGeoJSON;
  // Set the GeoJSON representation
  if (isGeoJSONFormat(geoJSON)) {
    instanceGeoJSON = geoJSON;
  } else {
    console.error('geoJSON is not in GeoJSON format');
  }
  const instance = await Model.create({
    data: {
      osm_id,
      osm_type,
      geoJSON: instanceGeoJSON,
      nodes: {
        connect: nodes.map((node) => ({ id: node.id })),
      },
      tags,
    },
  });
  return instance;
}

/**
 * Converts a Model instance to a GeoJSON object.
 *
 * @param {any} Model - the Model class
 * @param {any} instance - the instance to convert
 * @return {Promise<any>} the GeoJSON object
 */

export async function toGeoJSON(Model: any, instance: any) {
  // console.log("toGeoJSON instance", instance);

  if (!instance) {
    console.error('instance is undefined or null');
    return {};
  }

  const geoJSON: any = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [],
    },
  };

  if (instance.tags) {
    geoJSON.properties = propertiesToTags(instance.tags);
  }

  // Retrieve the Node documents from the database
  // const nodes = []
  // await Node.find({ _id: { $in: instance.nodes } }).exec();

  // nodes.forEach((node: any) => {
  //   // assuming nodes are already saved and their ids are stored in `nodes`
  //   // we can fetch the node data here using findById or leave it as it is if id is enough
  //   geoJSON.geometry.coordinates.push([node.lat, node.lon]);
  // });

  return geoJSON;
}

// Mapping of types to Models

/**
 * Finds an existing model based on the provided id and type.
 *
 * @param {any} Model - The model to search for an existing item.
 * @param {any} id - The id of the item to search for.
 * @param {string} type - The type of the item to search for.
 * @return {Promise<any>} A promise that resolves to the found item, or null if not found.
 */
export function findExisting(Model: any, id: any) {
  return Model.findById(id);
}

/**
 * Updates an instance object using GeoJSON data.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {any} instance - The instance to be updated.
 * @param {any} geoJSON - The GeoJSON data used to update the instance.
 * @return {Promise<any>} - The updated instance.
 */
export async function updateInstanceFromGeoJSON(instance: any, geoJSON: any) {
  instance.updated_at = geoJSON.properties.timestamp;
  instance.tags = propertiesToTags(geoJSON.properties);
  instance.nodes = await coordinatesToInstances(
    instance.node,
    handleGeoJSONGeometry(geoJSON.geometry),
  );
  instance.geoJSON = geoJSON;
  return instance;
}

/**
 * Creates a new instance based on the given `osm_type` and `element`.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {any} osm_type - The model to use for creating the instance.
 * @param {any} element - The element to create the instance from.
 * @return {any} The newly created instance.
 */
export async function createNewInstance(Model: any, element: any) {
  if (isOSMFormat(element)) {
    return await fromOSM(Model, element);
  } else if (isGeoJSONFormat(element)) {
    return await fromGeoJSON(Model, element);
  }
  throw new Error('Element is neither in OSM or GeoJSON format.');
}

/**
 * Ensures that the given element has an 'id' property in the format 'type/id'.
 * If the 'id' property is missing and the element has 'properties' and 'osm_id' property,
 * the 'id' property is created by combining the 'osm_type' and 'osm_id' properties.
 * If the 'type' property is missing and the element has 'properties' and 'osm_type' property,
 * the 'type' property is created by copying the value of the 'osm_type' property.
 *
 * @param {any} element - The element to ensure the 'id' and 'type' properties for.
 * @return {any} - The modified element with the 'id' and 'type' properties.
 */
export function ensureIdProperty(element: any) {
  if (!element.id && element.properties?.osm_id) {
    // Create 'id' in the format 'type/id'
    let { osm_type, osm_id } = element.properties;

    if (osm_type === 'N') {
      osm_type = 'node';
    } else if (osm_type === 'W') {
      osm_type = 'way';
    } else if (osm_type === 'R') {
      osm_type = 'relation';
    }

    element.id = `${osm_type}/${osm_id}`;
  }

  if (!element.type && element.properties?.osm_type) {
    // Create 'type' from 'osm_type'
    element.type = element.properties.osm_type;
  }

  return element;
}

/**
 * Ensures the model property of the given element.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {any} element - The element to ensure the model property for.
 * @return {ModelForElement | undefined} - The model for the element, or undefined if the type is invalid.
 */
export function ensureModelProperty(element: any) {
  // Convert the osm_type to lowercase if it's a string
  const osmType =
    typeof element.properties.osm_type === 'string'
      ? element.properties.osm_type.toLowerCase()
      : element.properties.osm_type;
  const ModelForElement = modelMappingFunc(osmType);
  if (!ModelForElement) {
    console.error(`Invalid type: ${element.properties.osm_type}`);
    return;
  }
  return ModelForElement;
}

/**
 * Processes an element.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {any} element - The element to be processed.
 * @return {Promise<any>} The processed element instance.
 */
export async function processElement(element: any) {
  // Extract OSM ID and type
  const id = element.id
    ? Number(element.id.split('/')[1])
    : Number(element.properties.osm_id);
  const type = element.id
    ? element.id.split('/')[0]
    : element.properties.osm_type;

  // Retrieve corresponding Model
  const ModelForElement = modelMappingFunc(type);
  if (!ModelForElement) {
    console.error(`Invalid type: ${type}`);
    return;
  }

  let instance = await findExisting(ModelForElement, id);
  if (instance) {
    if (isGeoJSONFormat(element)) {
      instance = await updateInstanceFromGeoJSON(instance, element);
      const { id, ...data } = instance;
      await (ModelForElement as any).update({
        where: { id },
        data,
      });
    }
  } else {
    instance = await createNewInstance(ModelForElement, element);
  }
  return instance;
}

/**
 * Finds or creates multiple instances of a specified model.
 * @param {PrismaClient} prisma - Prisma client.
 * @param {typeof Way} Model - The model to find or create instances of.
 * @param {any} data - The data to find or create instances with.
 * @throws {Error} If the data is not iterable.
 * @returns {Array<any>} An array of instances that were found or created.
 */
export async function findOrCreateMany(data: any) {
  // Check if data is iterable
  if (!Array.isArray(data)) {
    throw new Error('Data is not iterable, cannot proceed.');
  }

  const instances: any[] = [];

  for (const element of data) {
    const instance = await processElement(element);
    if (instance) {
      instances.push(instance);
    }
  }
  return instances;
}
