import axios from 'axios'

/**
 * Retrieves Nominatim details based on the provided latitude, longitude, or place ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Returns nothing.
 */
export const getNominatimDetails = async (req, res) => {
  const { lat, lon, place_id } = req.query

  let nominatimUrl = ''

  if (place_id) {
    nominatimUrl = `https://nominatim.openstreetmap.org/lookup?format=json&osm_ids=${place_id}&addressdetails=1`
  } else if (lat && lon) {
    nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
  } else {
    res.status(400).send({ message: 'Invalid request parameters' })
    return // Return early to avoid further execution
  }

  try {
    const response = await axios.get(nominatimUrl)

    if (response.status === 200) {
      res.send(response.data)
    } else {
      console.log(response.status, response.statusText)
      res.send({ message: 'Error processing Nominatim Data' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Error retrieving Nominatim Data' })
  }
}
