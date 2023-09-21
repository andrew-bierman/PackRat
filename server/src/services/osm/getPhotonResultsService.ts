import axios from 'axios';

export async function getPhotonResultsService(searchString) {
    const params = {
      q: searchString,
      osm_tag: ['highway:footway', 'highway:cycleway', 'place'],
      // osm_tag: "highway:footway",
      // osm_tag: "highway:cycleway",
      // osm_tag: "place",
    }
  
    const queryString = Object.entries(params)
      .flatMap(([key, values]) =>
        Array.isArray(values)
          ? values.map((val) => `${key}=${val}`)
          : `${key}=${values}`,
      ).join('&');

  
    const response = await axios.get(
      `https://photon.komoot.io/api/?${queryString}`,
    )
    return response
  }