import osmtogeojson from 'osmtogeojson'
import axios from 'axios'

/**
 * Retrieves enhanced details for a photon based on the given id and type.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise} A promise that resolves to the enhanced photon details.
 */
export const getEnhancedPhotonDetails = async (req, res) => {
  let { id, type } = req.params

  if (!id || !type) {
    res.status(400).send({ message: 'Invalid request parameters' })
    return // Return early to avoid further execution
  }

  type = type.toLowerCase() // Standardize osm_type to be lowercase

  switch (type) {
    case 'way':
    case 'w':
      type = 'way'
      break
    case 'node':
    case 'n':
      type = 'node'
      break
    case 'relation':
    case 'r':
      type = 'relation'
      break
    default:
      res.status(400).send({ message: 'Invalid request parameters' })
      return // Return early to avoid further execution
  }

  const overpassUrl = process.env.OSM_URI
  const overpassQuery = `
    [out:json][timeout:25];
    ${type}(${id});
    (._;>;);
    out body;
    `

  console.log('overpassQuery', overpassQuery)

  const nominatimUrl = `https://nominatim.openstreetmap.org/lookup?format=json&osm_ids=${type[0]}${id}&addressdetails=1`

  try {
    const overpassPromise = axios.post(overpassUrl, overpassQuery, {
      headers: { 'Content-Type': 'text/plain' }
    })

    const nominatimPromise = axios.get(nominatimUrl)

    const [overpassResponse, nominatimResponse] = await Promise.all([
      overpassPromise,
      nominatimPromise
    ])

    const geojsonData = osmtogeojson(overpassResponse.data)

    if (overpassResponse.status === 200 && nominatimResponse.status === 200) {
      // Assuming nominatimResponse.data is an array of objects
      const nominatimData = nominatimResponse.data

      console.log('nominatimData', nominatimData)

      // Add Nominatim data into each feature properties of the GeoJSON
      geojsonData.features.forEach((feature) => {
        feature.properties = {
          ...feature.properties,
          ...nominatimData
        }
      })

      res.send({
        photon: geojsonData
      })
    } else {
      console.log(overpassResponse.status, overpassResponse.statusText)
      console.log(nominatimResponse.status, nominatimResponse.statusText)
      res.send({ message: 'Error processing data' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Error retrieving data' })
  }
}
