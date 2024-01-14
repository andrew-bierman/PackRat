const { withExpo } = require('@expo/next-adapter');
const { withTamagui } = require('@tamagui/next-plugin');
const { join } = require('path');

const boolVals = {
  true: true,
  false: false,
};
const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development';

const plugins = [
  withTamagui({
    config: '../../packages/ui/src/tamagui.config.ts',
    components: ['tamagui'],
    importsWhitelist: ['constants.js', 'colors.js'],
    outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
    logTimings: true,
    disableExtraction,
    shouldExtract: (path) => {
      if (path.includes(join('packages', 'app'))) {
        return true;
      }
    },
    excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],
  }),
];

const nextConfig = function () {
  let config = {
    typescript: {
      ignoreBuildErrors: true,
    },
    modularizeImports: {
      '@tamagui/lucide-icons': {
        transform: `@tamagui/lucide-icons/dist/esm/icons/{{kebabCase member}}`,
        skipDefaultConversion: true,
      },
    },
    transpilePackages: [
      'solito',
      'react-native-web',
      'expo-linking',
      'expo-constants',
      'expo-modules-core',
      'react-native',
      'dripsy',
      '@dripsy/core',
      'moti',
      'app',
      'react-native-reanimated',
      '@expo/html-elements',
      'react-native-gesture-handler',
      "@expo/vector-icons",
      "expo-font",
    ],
    experimental: {
      scrollRestoration: true,
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
            publicPath: '/_next/static/fonts/',
            outputPath: 'static/fonts/',
          },
        },
      });
      config.module.rules.push({
        test: /\.js$/,
        include: [
          /node_modules\/@react-native\/assets-registry/,
          /node_modules\/react-native/,
        ],
        use: options.defaultLoaders.babel,
      })
      return config;
    },
    env: {
      API_URL: process.env.API_URL,
    }
  };

  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    };
  }

  return config;
};

module.exports = withExpo(nextConfig());
