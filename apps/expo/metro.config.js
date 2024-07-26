// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Remove all console logs in production
config.transformer.minifierConfig.compress.drop_console = true;

// Include 'cjs' in asset extensions
config.resolver.assetExts.push('cjs');

// Include 'mjs' and 'cjs' in source extensions
config.resolver.sourceExts.push(
  'mjs',
  'cjs',
  '.solito.js',
  'native.ts',
  'web.ts',
);

// Find the project and workspace directories
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../../'); // Adjust as per your project structure

// Watch all files within the monorepo
config.watchFolders = [workspaceRoot];
// Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];
// Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true;

const customAliases = {
  '@crosspath-resolver': './resolver.solito.js',
  '@env': path.resolve(projectRoot, 'envResolver.ts'),
  '@packrat/validations': path.resolve(projectRoot, 'packages/validations/src'),
};

config.resolver.extraNodeModules = new Proxy(
  {
    ...config.resolver.extraNodeModules,
    ...customAliases,
  },
  {
    get: (target, name) =>
      target.hasOwnProperty(name)
        ? target[name]
        : path.join(projectRoot, 'node_modules', name),
  },
);

module.exports = config;
