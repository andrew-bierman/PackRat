import fetch from "node-fetch";

export const getTrails = async (req, res) => {
  try {
    const radiusParams = 25;
    const activityParams = true;
    const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
    const {
      administrative_area_level_1,
      locality,
      latitude,
      longitude,
    } = req.body;
    const state = administrative_area_level_1;
    const city = locality.replace(/\s/g, ""); // Remove whitespaces from city name

    let paramsConditional = "";

    const root = process.env.GET_TRAIL_ROOT_URL;

    if (latitude) paramsConditional += `lat=${latitude}`;
    if (longitude) paramsConditional += `&lon=${longitude}`;

    if (city) paramsConditional += `&q-city_cont=${city}`;

    if (radiusParams) paramsConditional += `&radius=${radiusParams}`;
    if (activityParams) paramsConditional += `&q-activities_activity_type_name_eq=hiking`;

    const url = root + paramsConditional;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "trailapi-trailapi.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      return res.status(500).json({ message: "Error retrieving trail data from RapidAPI" });
    }

    const jsonData = await response.json();
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving trail data from RapidAPI", error: error.message });
  }
};
