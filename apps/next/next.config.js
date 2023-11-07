/** @type {import('next').NextConfig} */
const { withTamagui } = require('@tamagui/next-plugin')
const { join } = require('path')
const { withExpo } = require('@expo/next-adapter')

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    'expo-font',
    '@tamagui'
  ],
}

const boolVals = {
  true: true,
  false: false,
}

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development'


const plugins = [
  withExpo,
  withTamagui({
    // themeBuilder: {
    //   input: "../../packages/ui/src/themes/theme.ts",
    //   output: "../../packages/ui/src/themes/theme-generated.ts",
    // },
    config: './tamagui.config.ts',
    components: ['tamagui', '@packrat/ui'],
    importsWhitelist: ['constants.js', 'colors.js'],
    outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
    logTimings: true,
    disableExtraction,
    // experiment - reduced bundle size react-native-web
    useReactNativeWebLite: false,
    shouldExtract: (path) => {
      if (path.includes(join('packages', 'app'))) {
        return true
      }
    },
    excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],
  }),
]

module.exports = function () {
  /** @type {import('next').NextConfig} */
  let config = {
    images: {},
    // typescript: {
    //   ignoreBuildErrors: true,
    // },
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
      'react-native-safe-area-context',
      'react-native-reanimated',
      'react-native-gesture-handler',
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
      'expo-font',
      '@tamagui'
    ],
    experimental: {
      /*
       A few notes before enabling app directory:

       - App dir is not yet stable - Usage of this for production apps is discouraged.
       - Tamagui doesn't support usage in React Server Components yet (usage with 'use client' is supported).
       - Solito doesn't support app dir at the moment - You'll have to remove Solito.
       - The `/app` in this starter has the same routes as the `/pages` directory. You should probably remove `/pages` after enabling this.
      */
      appDir: false,
      // optimizeCss: true,
      scrollRestoration: true,
      legacyBrowsers: false,
          forceSwcTransforms: true,
    },

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.otf$/,
      loader: 'file-loader',
      options: {
        publicPath: '/_next/static/fonts/',
        outputPath: 'static/fonts/',
        name: '[name].[ext]',
      },
    });

    // Call additional plugins if they have been defined
    if (plugins.length > 0) {
      plugins.forEach(plugin => {
        config = plugin(config);
      });
    }

    return config;
  }
  }
}