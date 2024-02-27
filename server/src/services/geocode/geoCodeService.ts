import { ErrorFetchingGeoCodeError } from '../../helpers/errors';
import { oneEntity } from '../../utils/oneEntity';

export async function geoCodeService({
  addressArray,
  geoCodeUri,
  geoapifyKey,
}: any) {
  const address = await oneEntity(addressArray);
  const transform = address.split(', ').join('%20').split(' ').join('%20');

  const GEO_CODE_URL = geoCodeUri;
  const GEOAPIFY_KEY = geoapifyKey;

  let params = '?';

  if (address) params += `text=${transform}`;

  const api_key = `&apiKey=${GEOAPIFY_KEY}`;

  params += api_key;

  const url = GEO_CODE_URL + params;

  return await fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      return { message: 'ok', result };
    })
    .catch(() => {
      return ErrorFetchingGeoCodeError;
    });
}
