import fetch from "node-fetch";

/**
 * Retrieves trails based on the provided parameters.
 * @param {Object} req - The request object containing the parameters.
 * @param {Object} res - The response object.
 * @return {Promise} A promise that resolves with the retrieved trail data or an error message.
 */
export const getTrails = async (req, res) => {
  let radiusParams = 25;
  let activityParams = true;
  let X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
  const {
    administrative_area_level_1,
    country,
    locality,
    latitude,
    longitude,
  } = req.body;
  let state = administrative_area_level_1;
  let city = locality;

  let paramsConditional = "";

  const root = process.env.GET_TRAIL_ROOT_URL;

  if (latitude) paramsConditional += `lat=${latitude}`;
  if (longitude) paramsConditional += `&lon=${longitude}`;

  if (city) paramsConditional += `&q-city_cont=${city.replace(/\s/g, "")}`;

  if (radiusParams) paramsConditional += `&radius=${radiusParams}`;
  if (activityParams)
    paramsConditional += `&q-activities_activity_type_name_eq=hiking`;

  const url1 = root + paramsConditional;

  const url =
    "https://trailapi-trailapi.p.rapidapi.com/activity/?lat=34.1&lon=-105.2&q-city_cont=Denver&radius=25&q-activities_activity_type_name_eq=hiking";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${X_RAPIDAPI_KEY}`,
      "X-RapidAPI-Host": "trailapi-trailapi.p.rapidapi.com",
    },
  };

  await fetch(url1, options)
    .then((res) => res.json())
    .then((json) => {
      res.send(json);
    })
    .catch((_err) => {
      res.send({ message: "Error retrieving trail data from RapidAPI" });
    });
};