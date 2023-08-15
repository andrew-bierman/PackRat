import { api } from "../constants/api";

// Function to get weather data for the next week based on latitude and longitude
export const getWeatherWeek = async (lat, lon) => {
  // Create an empty weatherObject to store the fetched weather data
  let weatherObject = {};

  // Initialize parameters for the API request
  let params = `?`;
  const latParams = lat;
  const lonParams = lon;

  // Add latitude and longitude to the parameters if available
  if (latParams) params += `lat=${latParams}`;
  if (lonParams) params += `&lon=${lonParams}`;

  // Create the URL for the weather API request
  const url = api + "/weather/week" + params;

  // Send a GET request to the weather API with the constructed URL
  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      // Store the weather data from the API response in the weatherObject
      weatherObject = json;
    })
    .catch((err) => {
      // Handle errors if any occur during the API request
      console.log("error:" + err);
    });

  // Return only the first four items (next four days) from the list of weather data
  return weatherObject.list.slice(0, 4);
};
