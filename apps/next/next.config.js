const { withExpo } = require('@expo/next-adapter');
const { withTamagui } = require('@tamagui/next-plugin');
const { join } = require('path');
const path = require('path');
const webpack = require('webpack');
const { withCrossPath } = require('@packrat/crosspath/adapter');
const million = require('million/compiler');

const boolVals = {
  true: true,
  false: false,
};
const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ??
  process.env.NODE_ENV === 'development';

const enableMillionJS = true;

const plugins = [
  withTamagui({
    config: '../../packages/ui/src/tamagui.config.ts',
    components: ['tamagui', '@tamagui-extras/form'],
    importsWhitelist: ['constants.js', 'colors.js'],
    outputCSS:
      process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
    logTimings: true,
    disableExtraction,
    shouldExtract: (path) => {
      if (path.includes(join('packages', 'app'))) {
        return true;
      }
    },
    // excludeReactNativeWebExports: [
    //   'Switch',
    //   'ProgressBar',
    //   'Picker',
    //   'CheckBox',
    //   'Touchable',
    // ],
  }),
  withExpo,
  withCrossPath('solito'),
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
      '@expo/vector-icons',
      'expo-font',
      'expo-asset',
      'expo-constants',
      'expo-file-system',
      'expo-linking',
      'expo-permissions',
      'expo-splash-screen',
      'expo-status-bar',
      'expo-router',
      'native-base',
      'react-native-svg',
      'react-native-paper',
      'react-native-vector-icons',
      'expo-linear-gradient',
      '@tamagui/core',
      'native-base',
      'react-native-svg',
      'react-native-paper',
      '@react-navigation/native-stack',
      '@tanstack/query-async-storage-persister',
      'expo',
      'expo-application',
      'expo-auth-session',
      'expo-checkbox',
      'expo-crypto',
      'expo-document-picker',
      'expo-file-system',
      'expo-image-picker',
      'expo-location',
      'expo-random',
      'expo-secure-store',
      'expo-splash-screen',
      'expo-standard-web-crypto',
      'expo-status-bar',
      'expo-system-ui',
      'expo-web-browser',
      'expo-haptics',
      '@tanstack/react-query',
      'react-native-table-component',
      // Remove when we have a proper solution for this
      'expo-router',
      '@react-navigation/drawer',
      '@bacons/react-views',
      // End remove section
      '@rneui/themed',
      '@rneui/base',
      'react-native-ratings',
      'react-native-size-matters',
      'zeego',
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
      });
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-native': 'react-native-web',
        'react-native': path.join(__dirname, 'node_modules/react-native'),
      };
      config.resolve.alias['react-native-web/Libraries/Image/AssetRegistry'] =
        require.resolve('react-native-web/dist/modules/AssetRegistry');
      return config;
    },
  };

  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    };
  }

  const millionConfig = {
    auto: true,
    mute: false,
  };

  if (enableMillionJS) {
    config = million.next(config, millionConfig);
  }

  return config;
};

module.exports = nextConfig;
