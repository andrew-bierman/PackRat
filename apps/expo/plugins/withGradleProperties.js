const { withGradleProperties } = require('@expo/config-plugins');

module.exports = (config) => {
  const newGraddleProperties = [
    {
      type: 'property',
      key: 'MAPBOX_DOWNLOADS_TOKEN',
      value:process.env.MAPBOX_DOWNLOADS_TOKEN2,
    }
  ];

  return withGradleProperties(config, (config) => {
    newGraddleProperties.map((gradleProperty) => config.modResults.push(gradleProperty));

    return config;
  });
};