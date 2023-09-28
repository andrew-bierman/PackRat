import { oneEntity } from '../../utils/oneEntity';
import { RetrievingParksDataError } from '../../helpers/errors';

export async function getParksService(abbrStates) {
  const abbrState = await oneEntity(abbrStates);

  const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
  const NPS_API = process.env.NPS_API;
  const PARKS_HOST = process.env.PARKS_HOST;

  const host = `${PARKS_HOST}?stateCode=${abbrState}`;

  const options = {
    method: 'GET',
    headers: {
      'X-Api-Key': `${NPS_API}`,
      'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
      'X-RapidAPI-Host': 'jonahtaylor-national-park-service-v1.p.rapidapi.com',
      'User-Agent': 'PackRat',
    },
  };

  return await fetch(host, options)
    .then(async (res) => await res.json())
    .then((json) => {
      return json;
    })
    .catch(() => {
      throw RetrievingParksDataError;
    });
}
