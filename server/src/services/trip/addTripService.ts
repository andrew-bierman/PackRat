import Trip from '../../models/tripModel'
import Node from '../../models/osm/nodeModel'
import Way from '../../models/osm/wayModel'
import Relation from '../../models/osm/relationModel'

/**
 * Adds a trip to the database.
 * @param {Object} tripDetails - The trip details.
 * @return {Promise<string>} A promise that resolves to a success message.
 */
export const addTripService = async (tripDetails): Promise<string> => {
  try {
    const {
      name,
      description,
      duration,
      weather,
      start_date,
      end_date,
      destination,
      geoJSON,
      owner_id,
      packs,
      is_public
    } = tripDetails

    // Create the OSM object and get its _id
    const { osm_ref, osm_type } = await createOSMObject(geoJSON)

    await Trip.create({
      name,
      description,
      duration,
      weather,
      start_date,
      end_date,
      destination,
      osm_ref,
      osm_type,
      owner_id,
      packs,
      is_public
    })

    return 'success'
  } catch (error) {
    console.error(error)
    throw new Error('Unable to add trip')
  }
}

/**
   * Generates a new OSM object based on the provided geoJSON.
   *
   * @param {object} geoJSON - The geoJSON object representing the OSM object.
   * @throws {Error} Throws an error if the geoJSON object is invalid or missing.
   * @return {object} An object containing the osm_ref and osm_type properties of the newly created OSM object.
   */
const createOSMObject = async (geoJSON) => {
  // Check if geoJSON object is valid
  if (!geoJSON?.properties) {
    throw new Error('Invalid or missing geoJSON')
  }

  // Access the OSM type directly from geoJSON properties
  const osmType = geoJSON.properties.osm_type

  let OSMModel
  if (osmType === 'N') {
    OSMModel = Node
  } else if (osmType === 'W') {
    OSMModel = Way
  } else if (osmType === 'R') {
    OSMModel = Relation
  } else {
    throw new Error('Invalid OSM type')
  }

  // Create the corresponding OSM object
  const osmData = new OSMModel({
    osm_id: geoJSON.properties.osm_id,
    osm_type:
        OSMModel === Node ? 'node' : OSMModel === Way ? 'way' : 'relation', // Here change "W" to "way"
    tags: geoJSON.properties,
    geoJSON
  })

  // Save the OSM object and return its _id
  await osmData.save()

  console.log('osmData', osmData)

  return {
    osm_ref: osmData._id,
    osm_type:
        OSMModel === Node ? 'Node' : OSMModel === Way ? 'Way' : 'Relation'
  }
}
