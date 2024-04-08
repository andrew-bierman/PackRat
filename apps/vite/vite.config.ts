import { tamaguiExtractPlugin, tamaguiPlugin } from '@tamagui/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, transformWithEsbuild } from 'vite';
import { resolve } from 'path';
import esbuildFlowPlugin from 'esbuild-plugin-flow';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

const shouldExtract = process.env.EXTRACT === '1';

const tamaguiConfig = {
  components: ['tamagui'],
  config: 'src/tamagui.config.ts',
};

// https://tamagui.dev/docs/intro/installation
const extensions = [
  '.web.tsx',
  '.tsx',
  '.web.ts',
  '.ts',
  '.web.jsx',
  '.jsx',
  '.web.js',
  '.js',
  '.css',
  '.json',
  '.mjs',
  '.tanstack.ts',
];

const development = process.env.NODE_ENV === 'development';

export default defineConfig({
  clearScreen: true,
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        // Use an array to specify directories or path patterns for files to be transformed
        const includePatterns = [
          /node_modules\/@expo\/vector-icons/,
          /node_modules\/react-native-table-component/,
          /src\/.*\.js$/, // Specifically match .js files in the src directory
        ];
        
        // Check if the current file's path matches any pattern in includePatterns
        const shouldTransform = includePatterns.some(pattern => pattern.test(id));
        if (!shouldTransform) return null;

        // Proceed with JSX transformation if conditions are met
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      },
    },
    react(),
    TanStackRouterVite(),
    tamaguiPlugin(tamaguiConfig),
    shouldExtract ? tamaguiExtractPlugin(tamaguiConfig) : null,
  ].filter(Boolean),
  define: {
    // https://github.com/bevacqua/dragula/issues/602#issuecomment-1296313369
    global: 'window',
    __DEV__: JSON.stringify(development),
    // https://tamagui.dev/docs/intro/installation
    DEV: JSON.stringify(development),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  resolve: {
    // Add the resolve configuration
    alias: {
      extensions,
      '@crosspath-resolver': './resolver.tanstack.js',
      '@env': resolve(__dirname, 'envResolver'),
      // 'react-native': 'react-native-web',
      'react-native/Libraries/Image/AssetRegistry': resolve(
        __dirname,
        '../../node_modules/react-native-web/dist/modules/AssetRegistry',
      ),
      '@react-native/assets-registry/regisery': resolve(
        __dirname,
        '../../node_modules/react-native-web/dist/modules/AssetRegistry',
      ),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
      // https://github.com/vitejs/vite-plugin-react/issues/192#issuecomment-1627384670
      jsx: 'automatic',
      // need either this or the plugin below
      loader: {
        '.js': 'jsx'
      },
      plugins: [
        esbuildFlowPlugin(/\.(flow|jsx?)$/, (path) =>
          /\.jsx$/.test(path) ? 'jsx' : 'jsx',
        ),
      ],
    },
    include: ['@packrat/validations'],
    exclude: [],
  },
});
