function getVariantConfig() {
  switch (process.env.APP_VARIANT) {
    case 'development':
      return {
        appName: 'Packrat (Dev)',
        id: 'com.andrewbierman.packrat.development',
      };
    case 'preview':
      return {
        appName: 'Packrat (Preview)',
        id: 'com.andrewbierman.packrat.preview',
      };
    case 'production':
      return { appName: 'Packrat', id: 'com.andrewbierman.packrat' };
    default:
      throw new Error('APP_VARIANT env not set');
  }
}

module.exports = ({ config }) => {
  const { appName, id } = getVariantConfig();
  config.name = appName;
  config.ios.bundleIdentifier = id;
  config.android.package = id;

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
