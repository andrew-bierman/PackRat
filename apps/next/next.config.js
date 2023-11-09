/** @type {import('next').NextConfig} */
const { withTamagui } = require('@tamagui/next-plugin')
const { join } = require('path')
const { withNativebase } = require('@native-base/next-adapter')
const { withExpo } = require('@expo/next-adapter');
const withFonts = require('next-fonts');

const boolVals = {
  true: true,
  false: false,
}

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development'

console.log(`

Welcome to Tamagui!

You can update this monorepo to the latest Tamagui release just by running:

yarn upgrade:tamagui

We've set up a few things for you.

See the "excludeReactNativeWebExports" setting in next.config.js, which omits these
from the bundle: Switch, ProgressBar Picker, CheckBox, Touchable. To save more,
you can add ones you don't need like: AnimatedFlatList, FlatList, SectionList,
VirtualizedList, VirtualizedSectionList.

🐣

Remove this log in next.config.js.

`)

const baseConfig = {
  transpilePackages: [
    'solito',
    'react-native-web',
    'expo-linking',
    'expo-constants',
    'expo-modules-core',
    'react-native-safe-area-context',
    'react-native-reanimated',
    'react-native-gesture-handler',
    'expo-font',
    "expo-asset",
    "expo-font",
    "expo-modules-core",
    "@expo/vector-icons",
    "expo-constants",
    "expo-linking",
    "expo-splash-screen",
    "expo-status-bar",
    "expo-web-browser",

  ],
}

const plugins = [
  withExpo,
  withFonts,
  withTamagui({
    config: './tamagui.config.ts',
    components: ['tamagui', '@t4/ui'],
    importsWhitelist: ['constants.js', 'colors.js'],
    outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
    logTimings: true,
    disableExtraction,
    useReactNativeWebLite: true,
    shouldExtract: (path) => {
      if (path.includes(join('packages', 'app'))) {
        return true
      }
    },
  }),
  // (config) => withNativebase({
  //   dependencies: [
  //     '@expo/next-adapter',
  //     'react-native-vector-icons',
  //     'react-native-vector-icons-for-web',
  //     'solito',
  //     'app',
  //     '@packrat/ui',
  //   ],
  //   nextConfig: {
  //     projectRoot: __dirname,
  //     reactStrictMode: true,
  //     webpack5: true,
  //     webpack: (config, options) => {
  //       config.resolve.alias = {
  //         ...(config.resolve.alias || {}),
  //         'react-native$': 'react-native-web',
  //         '@expo/vector-icons': 'react-native-vector-icons',
  //       }
  //       config.resolve.extensions = [
  //         '.web.js',
  //         '.web.ts',
  //         '.web.tsx',
  //         ...config.resolve.extensions,
  //       ]
  //       return config
  //     },
  //   },
  // }),
]

module.exports = function () {
  /** @type {import('next').NextConfig} */
  let config = {
    // Uncomment if you want to use Cloudflare's Paid Image Resizing w/ Next/Image
    // images: {
    //   loader: 'custom',
    //   loaderFile: './cfImageLoader.js',
    // },
    // Using Solito image loader without Cloudflare's Paid Image Resizing
    images: {},
    typescript: {
      ignoreBuildErrors: true,
    },
    modularizeImports: {
      '@tamagui/lucide-icons': {
        transform: '@tamagui/lucide-icons/dist/esm/icons/{{kebabCase member}}',
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
    ],
    experimental: {
      /*
       A few notes before enabling app directory:

       - App dir is not yet stable - Usage of this for production apps is discouraged.
       - Tamagui doesn't support usage in React Server Components yet (usage with 'use client' is supported).
       - Solito doesn't support app dir at the moment - You'll have to remove Solito.
       - The `/app` in this starter has the same routes as the `/pages` directory. You should probably remove `/pages` after enabling this.
      */
      // optimizeCss,
      forceSwcTransforms: true,
      scrollRestoration: true,
      swcPlugins: [
        [
          'next-superjson-plugin',
          {
            excluded: [],
          },
        ],
      ],
    },
  }

  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    }
  }

  return config

  // Use reduce to apply the plugins to the base config
  // const nextConfig = plugins.reduce((config, plugin) => plugin(config), baseConfig);

  // const finalConfig = {
  //   ...nextConfig,
  //   ...config,
  // }


  // return finalConfig
}
