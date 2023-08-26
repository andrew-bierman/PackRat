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
      // NOTE: `expo-router/babel` is a temporary extension to `babel-preset-expo`.
      require.resolve('expo-router/babel'),
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '~/config': './config',
            '~/constants': './constants',
            '~/components': ['./components'],
            '~/utils': ['./utils'],
            '~/hooks': ['./hooks'],
            '~/store': ['./store'],
            '~/theme': ['./theme'],
          },
        },
      ],
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './theme/tamagui.config.js',
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
