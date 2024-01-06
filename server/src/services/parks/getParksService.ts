import { oneEntity } from '../../utils/oneEntity';
import { RetrievingParksDataError } from '../../helpers/errors';

export async function getParksService({
  abbrStates,
  rapidApiKey,
  npsApi,
  parksHost,
}) {
  const abbrState = await oneEntity(abbrStates);

  const X_RAPIDAPI_KEY = rapidApiKey;
  const NPS_API = npsApi;
  const PARKS_HOST = parksHost;

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
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(() => {
      // throw RetrievingParksDataError;
      return RetrievingParksDataError;
    });
}
