import { RetrievingTrailsDataError } from '../../helpers/errors';

export async function getTrailsService({
  trailRootUrl,
  xRapidapiKey,
  administrative_area_level_1,
  country,
  locality,
  latitude,
  longitude,
  radiusParams,
  activityParams,
}) {
  const state = administrative_area_level_1;
  const city = locality;

  let paramsConditional = '';

  const root = trailRootUrl;

  if (latitude) paramsConditional += `lat=${latitude}`;
  if (longitude) paramsConditional += `&lon=${longitude}`;

  if (city) paramsConditional += `&q-city_cont=${city.replace(/\s/g, '')}`;

  if (radiusParams) paramsConditional += `&radius=${radiusParams}`;
  if (activityParams) {
    paramsConditional += '&q-activities_activity_type_name_eq=hiking';
  }

  const url1 = root + paramsConditional;

  const url =
    'https://trailapi-trailapi.p.rapidapi.com/activity/?lat=34.1&lon=-105.2&q-city_cont=Denver&radius=25&q-activities_activity_type_name_eq=hiking';

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${xRapidapiKey}`,
      'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com',
    },
  };

  return await fetch(url1, options)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch((_err) => {
      // throw RetrievingTrailsDataError;
      return RetrievingTrailsDataError;
    });
}
