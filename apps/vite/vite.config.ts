import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import esbuildFlowPlugin from 'esbuild-plugin-flow';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import { tamaguiExtractPlugin, tamaguiPlugin } from '@tamagui/vite-plugin';
import * as esbuild from 'esbuild';
import { readFileSync } from 'fs';

const shouldExtract = process.env.EXTRACT === '1';

const tamaguiConfig = {
  components: ['tamagui'],
  config: 'src/tamagui.config.ts',
};

// https://tamagui.dev/docs/intro/installation
const extensions = [
  '.mjs',
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

const rollupPlugin = (matchers: RegExp[]) => ({
  name: 'js-in-jsx',
  load(id: string) {
    if (matchers.some((matcher) => matcher.test(id)) && id.endsWith('.js')) {
      const file = readFileSync(id, { encoding: 'utf-8' });
      return esbuild.transformSync(file, { loader: 'jsx', jsx: 'automatic' });
    }
  },
});

export default defineConfig({
  clearScreen: true,
  cacheDir: '../../node_modules/.vite/vite-app',
  plugins: [
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
        esbuildFlowPlugin(
          /\.(flow|jsx?)$/,
          (path) => (/\.jsx$/.test(path) ? 'jsx' : 'jsx'),
        ),
      ],
    },
    include: ['@packrat/validations'],
    exclude: [],
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true },
    rollupOptions: {
      plugins: [
        rollupPlugin([/react-native-vector-icons/, /@expo\/vector-icons/, /react-native-table-component/]),
      ],
    },
  },
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  test: {
    globals: true,
    cache: { dir: '../../node_modules/.vitest' },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
