/**
 * Creates an instance from the given coordinates.
 *
 * @param {any} Model - The model to create an instance from.
 * @param {[number, number]} [lon, lat] - The longitude and latitude coordinates.
 * @return {Promise<string>} The ID of the created instance.
 */
export async function createInstanceFromCoordinates(
  Model: any,
  [lon, lat]: [number, number],
) {
  if (typeof lon !== 'number' || typeof lat !== 'number') {
    console.error('Invalid coordinate format');
    return null;
  }

  const instance = await Model.create({
    data: {
      lon,
      lat,
    },
  });
  return instance.id;
}

/**
 * Converts coordinates to instances using the given Model.
 *
 * @param {any} Model - The model to use for creating instances.
 * @param {any} coordinates - The coordinates to convert to instances.
 * @return {Promise<any[]>} An array of instances created from the coordinates.
 */
export async function coordinatesToInstances(Model: any, coordinates: any) {
  if (!Array.isArray(coordinates)) {
    console.error('Coordinates is not an array');
    return [];
  }

  if (coordinates.length === 0) {
    return [];
  }

  const isNestedArray = Array.isArray(coordinates[0]);

  if (!isNestedArray) {
    // Check if we have coordinates or an id
    if (typeof coordinates[0] === 'number') {
      return [
        await createInstanceFromCoordinates(
          Model,
          coordinates as [number, number],
        ),
      ];
    } else {
      return coordinates;
    }
  }

  if (typeof coordinates[0][0] === 'number') {
    return await Promise.all(
      coordinates.map(
        async (coordinate) =>
          await createInstanceFromCoordinates(Model, coordinate),
      ),
    );
  } else {
    return coordinates;
  }
}

/**
 * Handles the geometry data and creates instances based on the coordinates.
 *
 * @param {any} Model - The model to create instances from.
 * @param {any} geometry - The geometry data to handle.
 * @return {Promise<Array<any>>} An array of instance IDs.
 */
export async function handleGeometry(Model: any, geometry: any) {
  // console.log("handleGeometry");
  // console.log("handleGeometry geometry", geometry);

  if (!geometry || !Array.isArray(geometry.coordinates)) {
    console.error('geometry is undefined or not an array');
    return [];
  }

  const nodes: any[] = [];

  if (geometry.type === 'Point') {
    const instance = await createInstanceFromCoordinates(
      Model,
      geometry.coordinates,
    );
    nodes.push(instance.id);
  } else {
    for (const coords of geometry.coordinates) {
      const instance = await createInstanceFromCoordinates(Model, coords);
      nodes.push(instance.id);
    }
  }

  return nodes;
}

/**
 * Handles the GeoJSON geometry by extracting the coordinates and returning them as an array.
 *
 * @param {any} geometry - The GeoJSON geometry object.
 * @return {Array} - An array of coordinates extracted from the geometry.
 */
export function handleGeoJSONGeometry(geometry: any) {
  // console.log("handleGeometry");
  // console.log("handleGeometry geometry", geometry);

  if (!geometry || !Array.isArray(geometry.coordinates)) {
    console.error('geometry is undefined or not an array');
    return [];
  }

  const nodes: any[] = [];

  if (geometry.type === 'Point') {
    nodes.push(geometry.coordinates);
  } else {
    for (const coords of geometry.coordinates) {
      nodes.push(coords);
    }
  }

  return nodes;
}
