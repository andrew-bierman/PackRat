import { ErrorFetchingGeoCodeError } from '../../helpers/errors';
import { oneEntity } from '../../utils/oneEntity';

export async function geoCodeService({ addressArray }: any) {
  const address = await oneEntity(addressArray);
  const transform = address.split(', ').join('%20').split(' ').join('%20');

  const GEO_CODE_URL = process.env.GEO_CODE_URL;
  const GEOAPIFY_KEY = process.env.GEOAPIFY_KEY;

  let params = '?';

  if (address) params += `text=${transform}`;

  const api_key = `&apiKey=${GEOAPIFY_KEY}`;

  params += api_key;

  const url = GEO_CODE_URL + params;

  return await fetch(url)
    .then(async (response) => response.json())
    .then((result) => {
      return { message: 'ok', result };
    })
    .catch(() => {
      return ErrorFetchingGeoCodeError;
    });
}
