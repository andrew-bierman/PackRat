const { withExpo } = require('@expo/next-adapter');
const { withTamagui } = require('@tamagui/next-plugin');
const { withFonts } = require('next-fonts');
const { join } = require('path');

const boolVals = {
  true: true,
  false: false,
};

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ??
  process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
let nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true
  reactStrictMode: false,
  transpilePackages: [
    'react-native',
    'react-native-web',
    'solito',
    'dripsy',
    '@dripsy/core',
    'moti',
    'app',
    'react-native-reanimated',
    '@expo/html-elements',
    'react-native-gesture-handler',
    'expo-linking',
    'expo-constants',
    'expo-modules-core',
    'expo-asset',
    'expo-font',
    '@expo/vector-icons',
    'react-native-vector-icons',
    'expo-linear-gradient',
    '@tamagui/core',
    'native-base',
    'react-native-svg',
    'react-native-paper',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  modularizeImports: {
    '@tamagui/lucide-icons': {
      transform: `@tamagui/lucide-icons/dist/esm/icons/{{kebabCase member}}`,
      skipDefaultConversion: true,
    },
  },
  experimental: {
    scrollRestoration: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Add a rule for loading .ttf files, to handle @expo/vector-icons
      config.module.rules.push({
        test: /\.ttf$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/fonts/',
            outputPath: 'static/fonts/',
            name: '[name].[ext]',
          },
        },
      });
    }
    return config;
  },
};

// Define plugins
const plugins = [
  // withFonts,
  withExpo,
  withTamagui({
    config: '../../packages/ui/src/tamagui.config.ts',
    components: ['tamagui', '@packrat/ui'],
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
    excludeReactNativeWebExports: [
      'Switch',
      'ProgressBar',
      'Picker',
      'CheckBox',
      'Touchable',
    ],
  }),
];

module.exports = function () {
  // Apply each plugin to the configuration
  plugins.forEach((plugin) => {
    nextConfig = plugin(nextConfig);
  });

  return nextConfig;
};
