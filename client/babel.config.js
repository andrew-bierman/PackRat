module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    ignore: [
      "**/node_modules/mapbox-gl/dist/mapbox-gl.js",
      "**/node_modules/mapbox-gl/dist/mapbox-gl.js.map",
      "./node_modules/mapbox-gl/dist/mapbox-gl.js",
    ],

    plugins: [
      // NOTE: `expo-router/babel` is a temporary extension to `babel-preset-expo`.
      require.resolve("expo-router/babel"),
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
