import togpx from "togpx";

export const getGeoJSONtoGPX = (req, res) => {
  try {
    const { geoJSON } = req.body;

    const options = {
      creator: "PackRat", // Hardcoded creator option
      metadata: {
        name: geoJSON.name || "", // Extract name from geoJSON (if available)
        desc: geoJSON.description || "", // Extract description from geoJSON (if available)
      },
    //   featureTitle: (properties) => properties.name || "", // Extract feature title from properties (if available)
    //   featureDescription: (properties) => properties.description || "", // Extract feature description from properties (if available)
    };

    const gpx = togpx(geoJSON, options);

    res.status(200).send(gpx);
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: "Unable to convert geoJSON to GPX" });
  }
};

  