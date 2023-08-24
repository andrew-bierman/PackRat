import { oneEntity } from '../../utils/oneEntity'
const fetch = async (...args) => await import('node-fetch').then(async ({ default: fetch }) => await fetch(...args as Parameters<typeof fetch>))

/**
 * Retrieves a list of parks based on the specified state code.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the park data or an error message.
 */
export const getParks = async (req, res) => {
  const abbrState = await oneEntity(req.query.abbrState)

  const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY
  const NPS_API = process.env.NPS_API
  const PARKS_HOST = process.env.PARKS_HOST

  const host = `${PARKS_HOST}?stateCode=${abbrState}`

  const options = {
    method: 'GET',
    headers: {
      'X-Api-Key': `${NPS_API}`,
      'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
      'X-RapidAPI-Host': 'jonahtaylor-national-park-service-v1.p.rapidapi.com',
      'User-Agent': 'PackRat'
    }
  }

  await fetch(host, options)
    .then(async (res) => await res.json())
    .then((json) => {
      res.send(json)
    })
    .catch(() =>
      res.send({ message: 'Error retrieving park data from RapidAPI' })
    )
}
