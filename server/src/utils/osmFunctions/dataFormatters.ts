/**
 * Extracts the id and type from a given string.
 *
 * @param {string} string - The input string.
 * @return {Object} An object containing the extracted type and id.
 */
export const extractIdAndType = (string: string) => {
  // console.log("string", string)
  if (string.includes('/')) {
    const [type, idString] = string.split('/')

    const idNumber = Number(idString)

    return { type, id: idNumber }
  } else {
    return { type: 'node', id: string }
  }
}

// Determine if data is in OSM format
export function isOSMFormat (data: any) {
  return data?.type && data.id && data.tags && data.nodes
}

// Determine if data is in GeoJSON format
export function isGeoJSONFormat (data: any) {
  return data && data.type === 'Feature' && data.geometry && data.properties
}

/**
 * Converts properties to tags.
 *
 * @param {any} properties - The properties to be converted.
 * @return {any} The converted tags.
 */
export function propertiesToTags (properties: any) {
  if (!properties) {
    console.error('properties is undefined or null')
    return {}
  }
  if (typeof properties !== 'object' || properties === null) {
    throw new Error('Properties should be an object')
  }
  // console.log("properties in propertiesToTags", properties);
  const tags: any = {}
  for (const [k, v] of Object.entries(properties)) {
    tags[k] = v
  }
  return tags
}
