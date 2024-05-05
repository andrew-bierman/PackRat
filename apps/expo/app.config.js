import "dotenv/config";


module.exports = ({ config }) => {

  config.extra.NODE_ENV = process.env.NODE_ENV;
  config.extra.CLIENT_URL = process.env.CLIENT_URL;
  config.extra.MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
  config.extra.API_URL = process.env.API_URL;

  return {
    ...config,
    plugins: config.plugins.map(i => {
      if (i[0] === "@rnmapbox/maps") {
        return [
          "@rnmapbox/maps",
          {
            "RNMapboxMapsImpl": "mapbox",
            "RNMapboxMapsDownloadToken": process.env.MAPBOX_DOWNLOADS_TOKEN
          }
        ]
      }
      return i;
    })
  };
};
