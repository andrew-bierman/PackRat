import { RetrievingTrailsDataError } from '../../helpers/errors';

export async function getTrailsService(administrative_area_level_1, country, locality, latitude, longitude, radiusParams, activityParams) {
    const state = administrative_area_level_1;
    const city = locality;

    let paramsConditional = '';

    const root = process.env.GET_TRAIL_ROOT_URL;

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

    const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
            'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com',
        },
    };

    return await fetch(url1, options)
        .then(async (res) => await res.json())
        .then((json) => {
            return json
        })
        .catch((_err) => {
            throw RetrievingTrailsDataError
        });
}