module.exports = ({ config }) => {
  return {
    ...config,
    plugins: config.plugins.map((i) => {
      if (i[0] === '@rnmapbox/maps') {
        return [
          '@rnmapbox/maps',
          {
            RNMapboxMapsImpl: 'mapbox',
            RNMapboxMapsDownloadToken: process.env.MAPBOX_DOWNLOADS_TOKEN,
          },
        ];
      }
      return i;
    }),
  };
};
