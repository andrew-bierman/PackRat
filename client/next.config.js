const { withExpo } = require('@expo/next-adapter');

module.exports = withExpo({
  // transpilePackages is a Next.js +13.1 feature.
  // older versions can use next-transpile-modules
  transpilePackages: [
    'react-native',
    'expo',
    "@babel/runtime/helpers/objectSpread2",
    "react-native-web",
    "@tamagui",
    "tamagui"
    // Add more React Native / Expo packages here...
  ],
});
