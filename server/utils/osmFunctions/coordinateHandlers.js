import Way from "../../models/osm/wayModel.js";
import Node from "../../models/osm/nodeModel.js";

export async function createInstanceFromCoordinates(Model, [lon, lat]) {
  if (typeof lon !== "number" || typeof lat !== "number") {
    console.error("Invalid coordinate format");
    return null;
  }

  const instance = new Model({ lon, lat });
  await instance.save();
  return instance._id;
}

export async function createOrFindInstanceFromCoordinates(Model, [lon, lat]) {
  if (typeof lon !== "number" || typeof lat !== "number") {
    console.error("Invalid coordinate format");
    return null;
  }

  const findNode = await Model.findOne({ lon, lat });
  if( findNode ){
    return findNode._id;
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
      return [await createOrFindInstanceFromCoordinates(Model, coordinates)];
    } else {
      return coordinates;
    }
  }

  if (typeof coordinates[0][0] === "number") {
    return await Promise.all(
      coordinates.map((coordinate) =>
      createOrFindInstanceFromCoordinates(Model, coordinate)
      )
    );
  } else {
    return coordinates;
  }
}

export async function handleGeometry(Model, geometry) {
  // console.log("handleGeometry");
  // console.log("handleGeometry geometry", geometry);

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
  // console.log("handleGeometry");
  // console.log("handleGeometry geometry", geometry);

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
