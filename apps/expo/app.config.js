module.exports = ({ config }) => {
    console.log(JSON.stringify(config))
    console.log(process.env);
    return {
      ...config,
      plugins: config.plugins.map(i => {
        if (i[0] === "@rnmapbox/maps") {
            return [
                "@rnmapbox/maps",
                {
                  "RNMapboxMapsImpl": "mapbox",
                  "RNMapboxMapsDownloadToken": process.env.MAPBOX_DOWNLOADS_TOKEN2
                }
              ]
        }
        return i;
      })
    };
  };