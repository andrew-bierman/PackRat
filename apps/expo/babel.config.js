module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      'react-native-reanimated/plugin',
      require.resolve('expo-router/babel'),
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
        }
      ],
      [
        '@tamagui/babel-plugin',
        {
          exclude: ['**/node_modules/**'],
          config: './theme/tamagui.config.js',
          logTimings: true,
        }
      ],
      [
        'transform-inline-environment-variables',
        {
          include: 'TAMAGUI_TARGET',
        }
      ],
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        }
      ]
    ]
  };
};
