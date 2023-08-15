import axios from "axios";

/**
 * Retrieves Photon results based on a search string.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {undefined} There is no explicit return value.
 */
export const getPhotonResults = async (req, res) => {
  const { searchString } = req.query;

  if (!searchString) {
    res.status(400).send({ message: "Invalid request parameters" });
    return; // Return early to avoid further execution
  }

  let params = {
    q: searchString,
    osm_tag: ["highway:footway", "highway:cycleway", "place"],
    // osm_tag: "highway:footway",
    // osm_tag: "highway:cycleway",
    // osm_tag: "place",
  };

  const queryString = Object.entries(params)
    .flatMap(([key, values]) =>
      Array.isArray(values)
        ? values.map((val) => `${key}=${val}`)
        : `${key}=${values}`
    )
    .join("&");

  console.log("queryString----", queryString);

  try {
    const response = await axios.get(
      `https://photon.komoot.io/api/?${queryString}`
    );

    // console.log("response", response);

    const resultsArray = response.data.features;

    res.send(resultsArray);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving Photon results" });
  }
}