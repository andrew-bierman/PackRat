import { api } from "../constants/api";

// Function to get weather data based on latitude, longitude, and state
export const getWeather = async (lat, lon, state) => {
  // Create an empty weatherObject to store the fetched weather data
  let weatherObject = {};

  // Initialize parameters for the API request
  let params = `?`;
  if (lat) params += `lat=${lat}`;
  if (lon) params += `&lon=${lon}`;

  // Create the URL for the weather API request
  const url = api + "/weather" + params;

  // Send a GET request to the weather API with the constructed URL
  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      // Store the weather data from the API response in the weatherObject
      weatherObject = json;
    })
    .catch((err) => {
      // Handle errors if any occur during the API request
      console.error("error:" + err);
    });

  // Add the state information to the weatherObject
  weatherObject.state = state;

  // Return the weatherObject containing the weather data and state information
  return weatherObject;
};
