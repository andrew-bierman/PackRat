import fetch from "node-fetch";

// Function to get hiking trails information based on location parameters
export const getTrails = async (req, res) => {
  // Default values for optional parameters
  let radiusParams = 25;
  let activityParams = true;

  // Retrieve the X_RAPIDAPI_KEY from environment variables
  let X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;

  // Extract location parameters from the request body
  const {
    administrative_area_level_1,
    country,
    locality,
    latitude,
    longitude,
  } = req.body;

  // Set state and city based on the extracted location parameters
  let state = administrative_area_level_1;
  let city = locality;

  // Initialize the conditional parameters for the API request
  let paramsConditional = "";

  // Retrieve the root URL for the get_trails API from environment variables
  const root = process.env.GET_TRAIL_ROOT_URL;

  // Construct the conditional parameters based on the available location parameters
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

  // Send a GET request to the get_trails API with the constructed URL and options
  await fetch(url1, options)
    .then((res) => res.json())
    .then((json) => {
      // Send the API response data as the result
      res.send(json);
    })
    .catch((_err) => {
      // Handle errors if any occur during the API request
      res.send({ message: "Error retrieving trail data from RapidAPI" });
    });
};
