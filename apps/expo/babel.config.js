process.env.TAMAGUI_TARGET = 'web';
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    ignore: [
      '**/node_modules/mapbox-gl/dist/mapbox-gl.js',
      '**/node_modules/mapbox-gl/dist/mapbox-gl.js.map',
      './node_modules/mapbox-gl/dist/mapbox-gl.js',
      './node_modules/mapbox-gl/**/*',
    ],

    plugins: [
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: false,
        },
      ],
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        },
      ],
      [
        '@tamagui/babel-plugin',
        {
          exclude: ['**/node_modules/**'],
          // components: ['@packrat/ui', 'tamagui'], // this breaks the stylesheet usage on Tamagui components, but fixes build time errors. TODO: fix this
          config: 'app/theme/tamagui.config.js',
          logTimings: true,
        },
      ],
      [
        'transform-inline-environment-variables',
        {
          include: 'TAMAGUI_TARGET',
        },
      ],
    ],
  };
};
