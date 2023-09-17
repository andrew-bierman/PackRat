// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Remove all console logs in production
config.transformer.minifierConfig.compress.drop_console = true;

// Include 'cjs' in asset extensions
config.resolver.assetExts.push('cjs');

// Include 'mjs' and 'cjs' in source extensions
config.resolver.sourceExts.push('mjs', 'cjs');

module.exports = config;
