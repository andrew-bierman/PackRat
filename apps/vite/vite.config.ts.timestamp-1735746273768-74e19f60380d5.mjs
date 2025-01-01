// vite.config.ts
import { defineConfig } from "file:///C:/Users/Alchemy/Desktop/Packrat/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Alchemy/Desktop/Packrat/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve } from "path";
import esbuildFlowPlugin from "file:///C:/Users/Alchemy/Desktop/Packrat/node_modules/esbuild-plugin-flow/index.js";
import { TanStackRouterVite } from "file:///C:/Users/Alchemy/Desktop/Packrat/node_modules/@tanstack/router-vite-plugin/dist/esm/index.js";
import { tamaguiExtractPlugin, tamaguiPlugin } from "file:///C:/Users/Alchemy/Desktop/Packrat/node_modules/@tamagui/vite-plugin/dist/esm/index.mjs";
import * as esbuild from "file:///C:/Users/Alchemy/Desktop/Packrat/node_modules/esbuild/lib/main.js";
import { readFileSync } from "fs";
var __vite_injected_original_dirname = "C:\\Users\\Alchemy\\Desktop\\Packrat\\apps\\vite";
var shouldExtract = process.env.EXTRACT === "1";
var tamaguiConfig = {
  components: ["tamagui"],
  config: "src/tamagui.config.ts"
};
var extensions = [
  ".mjs",
  ".web.tsx",
  ".tsx",
  ".web.ts",
  ".ts",
  ".web.jsx",
  ".jsx",
  ".web.js",
  ".js",
  ".css",
  ".json",
  ".mjs",
  ".tanstack.ts"
];
var development = process.env.NODE_ENV === "development";
var rollupPlugin = (matchers) => ({
  name: "js-in-jsx",
  load(id) {
    if (matchers.some((matcher) => matcher.test(id)) && id.endsWith(".js")) {
      console.log("Processing file:", id);
      const file = readFileSync(id, { encoding: "utf-8" });
      return esbuild.transformSync(file, { loader: "jsx", jsx: "automatic" });
    }
  }
});
var vite_config_default = defineConfig(({ mode }) => {
  return {
    clearScreen: true,
    cacheDir: "../../node_modules/.vite/vite-app",
    plugins: [
      react(),
      TanStackRouterVite(),
      tamaguiPlugin(tamaguiConfig),
      shouldExtract ? tamaguiExtractPlugin(tamaguiConfig) : null
    ].filter(Boolean),
    define: {
      // https://github.com/bevacqua/dragula/issues/602#issuecomment-1296313369
      global: "window",
      __DEV__: JSON.stringify(development),
      // https://tamagui.dev/docs/intro/installation
      DEV: JSON.stringify(development),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      // This will allow you to access the environment variables in your code from process.env, instead of having to use import.meta.env. This is because Expo does not support import.meta.env and throws an error when you try to use it (ie packages/config/src/index.ts).
      // https://stackoverflow.com/a/77824845/19816812
      // https://github.com/expo/expo/issues/21099
      // ...Object.keys(env).reduce((prev, key) => {
      //   prev[`process.env.${key}`] = JSON.stringify(env[key]);
      //   return prev;
      // }, {}),
    },
    resolve: {
      extensions,
      // Add the resolve configuration
      alias: {
        "@crosspath-resolver": "./resolver.tanstack.js",
        "@env": resolve(__vite_injected_original_dirname, "envResolver"),
        // 'react-native': 'react-native-web',
        "react-native/Libraries/Image/AssetRegistry": resolve(
          __vite_injected_original_dirname,
          "../../node_modules/react-native-web/dist/modules/AssetRegistry"
        ),
        "@react-native/assets-registry/regisery": resolve(
          __vite_injected_original_dirname,
          "../../node_modules/react-native-web/dist/modules/AssetRegistry"
        )
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        resolveExtensions: extensions,
        // https://github.com/vitejs/vite-plugin-react/issues/192#issuecomment-1627384670
        jsx: "automatic",
        // need either this or the plugin below
        loader: {
          ".js": "jsx"
        },
        plugins: [
          esbuildFlowPlugin(
            /\.(flow|jsx)$/,
            (path) => /\.jsx?$/.test(path) ? "jsx" : "jsx"
          )
        ]
      },
      include: ["@packrat/validations"],
      exclude: []
    },
    build: {
      commonjsOptions: { transformMixedEsModules: true },
      rollupOptions: {
        plugins: [
          rollupPlugin([
            /react-native-vector-icons/,
            /@expo\/vector-icons/,
            /react-native-table-component/,
            /@expo/,
            /expo-router/,
            /expo-clipboard/,
            /expo-modules-core/
          ])
        ]
      }
    },
    server: {
      port: 4200,
      host: "localhost"
    },
    preview: {
      port: 4300,
      host: "localhost"
    },
    test: {
      globals: true,
      cache: { dir: "../../node_modules/.vitest" },
      environment: "jsdom",
      include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBbGNoZW15XFxcXERlc2t0b3BcXFxcUGFja3JhdFxcXFxhcHBzXFxcXHZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFsY2hlbXlcXFxcRGVza3RvcFxcXFxQYWNrcmF0XFxcXGFwcHNcXFxcdml0ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQWxjaGVteS9EZXNrdG9wL1BhY2tyYXQvYXBwcy92aXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCBlc2J1aWxkRmxvd1BsdWdpbiBmcm9tICdlc2J1aWxkLXBsdWdpbi1mbG93JztcclxuaW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSAnQHRhbnN0YWNrL3JvdXRlci12aXRlLXBsdWdpbic7XHJcbmltcG9ydCB7IHRhbWFndWlFeHRyYWN0UGx1Z2luLCB0YW1hZ3VpUGx1Z2luIH0gZnJvbSAnQHRhbWFndWkvdml0ZS1wbHVnaW4nO1xyXG5pbXBvcnQgKiBhcyBlc2J1aWxkIGZyb20gJ2VzYnVpbGQnO1xyXG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tICdmcyc7XHJcblxyXG5jb25zdCBzaG91bGRFeHRyYWN0ID0gcHJvY2Vzcy5lbnYuRVhUUkFDVCA9PT0gJzEnO1xyXG5cclxuY29uc3QgdGFtYWd1aUNvbmZpZyA9IHtcclxuICBjb21wb25lbnRzOiBbJ3RhbWFndWknXSxcclxuICBjb25maWc6ICdzcmMvdGFtYWd1aS5jb25maWcudHMnLFxyXG59O1xyXG5cclxuLy8gaHR0cHM6Ly90YW1hZ3VpLmRldi9kb2NzL2ludHJvL2luc3RhbGxhdGlvblxyXG5jb25zdCBleHRlbnNpb25zID0gW1xyXG4gICcubWpzJyxcclxuICAnLndlYi50c3gnLFxyXG4gICcudHN4JyxcclxuICAnLndlYi50cycsXHJcbiAgJy50cycsXHJcbiAgJy53ZWIuanN4JyxcclxuICAnLmpzeCcsXHJcbiAgJy53ZWIuanMnLFxyXG4gICcuanMnLFxyXG4gICcuY3NzJyxcclxuICAnLmpzb24nLFxyXG4gICcubWpzJyxcclxuICAnLnRhbnN0YWNrLnRzJyxcclxuXTtcclxuXHJcbmNvbnN0IGRldmVsb3BtZW50ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XHJcblxyXG5jb25zdCByb2xsdXBQbHVnaW4gPSAobWF0Y2hlcnM6IFJlZ0V4cFtdKSA9PiAoe1xyXG4gIG5hbWU6ICdqcy1pbi1qc3gnLFxyXG4gIGxvYWQoaWQ6IHN0cmluZykge1xyXG4gICAgaWYgKG1hdGNoZXJzLnNvbWUoKG1hdGNoZXIpID0+IG1hdGNoZXIudGVzdChpZCkpICYmIGlkLmVuZHNXaXRoKCcuanMnKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnUHJvY2Vzc2luZyBmaWxlOicsIGlkKTtcclxuICAgICAgY29uc3QgZmlsZSA9IHJlYWRGaWxlU3luYyhpZCwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KTtcclxuICAgICAgcmV0dXJuIGVzYnVpbGQudHJhbnNmb3JtU3luYyhmaWxlLCB7IGxvYWRlcjogJ2pzeCcsIGpzeDogJ2F1dG9tYXRpYycgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgLy8gTG9hZCBlbnYgZmlsZSBiYXNlZCBvbiBgbW9kZWAgaW4gdGhlIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnkuXHJcbiAgLy8gU2V0IHRoZSB0aGlyZCBwYXJhbWV0ZXIgdG8gJycgdG8gbG9hZCBhbGwgZW52IHJlZ2FyZGxlc3Mgb2YgdGhlIGBWSVRFX2AgcHJlZml4LlxyXG4gIC8vIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY2xlYXJTY3JlZW46IHRydWUsXHJcbiAgICBjYWNoZURpcjogJy4uLy4uL25vZGVfbW9kdWxlcy8udml0ZS92aXRlLWFwcCcsXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHJlYWN0KCksXHJcbiAgICAgIFRhblN0YWNrUm91dGVyVml0ZSgpLFxyXG4gICAgICB0YW1hZ3VpUGx1Z2luKHRhbWFndWlDb25maWcpLFxyXG4gICAgICBzaG91bGRFeHRyYWN0ID8gdGFtYWd1aUV4dHJhY3RQbHVnaW4odGFtYWd1aUNvbmZpZykgOiBudWxsLFxyXG4gICAgXS5maWx0ZXIoQm9vbGVhbiksXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2JldmFjcXVhL2RyYWd1bGEvaXNzdWVzLzYwMiNpc3N1ZWNvbW1lbnQtMTI5NjMxMzM2OVxyXG4gICAgICBnbG9iYWw6ICd3aW5kb3cnLFxyXG4gICAgICBfX0RFVl9fOiBKU09OLnN0cmluZ2lmeShkZXZlbG9wbWVudCksXHJcbiAgICAgIC8vIGh0dHBzOi8vdGFtYWd1aS5kZXYvZG9jcy9pbnRyby9pbnN0YWxsYXRpb25cclxuICAgICAgREVWOiBKU09OLnN0cmluZ2lmeShkZXZlbG9wbWVudCksXHJcbiAgICAgICdwcm9jZXNzLmVudi5OT0RFX0VOVic6IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52Lk5PREVfRU5WKSxcclxuXHJcbiAgICAgIC8vIFRoaXMgd2lsbCBhbGxvdyB5b3UgdG8gYWNjZXNzIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgaW4geW91ciBjb2RlIGZyb20gcHJvY2Vzcy5lbnYsIGluc3RlYWQgb2YgaGF2aW5nIHRvIHVzZSBpbXBvcnQubWV0YS5lbnYuIFRoaXMgaXMgYmVjYXVzZSBFeHBvIGRvZXMgbm90IHN1cHBvcnQgaW1wb3J0Lm1ldGEuZW52IGFuZCB0aHJvd3MgYW4gZXJyb3Igd2hlbiB5b3UgdHJ5IHRvIHVzZSBpdCAoaWUgcGFja2FnZXMvY29uZmlnL3NyYy9pbmRleC50cykuXHJcbiAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83NzgyNDg0NS8xOTgxNjgxMlxyXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZXhwby9leHBvL2lzc3Vlcy8yMTA5OVxyXG4gICAgICAvLyAuLi5PYmplY3Qua2V5cyhlbnYpLnJlZHVjZSgocHJldiwga2V5KSA9PiB7XHJcbiAgICAgIC8vICAgcHJldltgcHJvY2Vzcy5lbnYuJHtrZXl9YF0gPSBKU09OLnN0cmluZ2lmeShlbnZba2V5XSk7XHJcbiAgICAgIC8vICAgcmV0dXJuIHByZXY7XHJcbiAgICAgIC8vIH0sIHt9KSxcclxuICAgIH0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGV4dGVuc2lvbnMsXHJcbiAgICAgIC8vIEFkZCB0aGUgcmVzb2x2ZSBjb25maWd1cmF0aW9uXHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0Bjcm9zc3BhdGgtcmVzb2x2ZXInOiAnLi9yZXNvbHZlci50YW5zdGFjay5qcycsXHJcbiAgICAgICAgJ0BlbnYnOiByZXNvbHZlKF9fZGlybmFtZSwgJ2VudlJlc29sdmVyJyksXHJcbiAgICAgICAgLy8gJ3JlYWN0LW5hdGl2ZSc6ICdyZWFjdC1uYXRpdmUtd2ViJyxcclxuICAgICAgICAncmVhY3QtbmF0aXZlL0xpYnJhcmllcy9JbWFnZS9Bc3NldFJlZ2lzdHJ5JzogcmVzb2x2ZShcclxuICAgICAgICAgIF9fZGlybmFtZSxcclxuICAgICAgICAgICcuLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtbmF0aXZlLXdlYi9kaXN0L21vZHVsZXMvQXNzZXRSZWdpc3RyeScsXHJcbiAgICAgICAgKSxcclxuICAgICAgICAnQHJlYWN0LW5hdGl2ZS9hc3NldHMtcmVnaXN0cnkvcmVnaXNlcnknOiByZXNvbHZlKFxyXG4gICAgICAgICAgX19kaXJuYW1lLFxyXG4gICAgICAgICAgJy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1uYXRpdmUtd2ViL2Rpc3QvbW9kdWxlcy9Bc3NldFJlZ2lzdHJ5JyxcclxuICAgICAgICApLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICBlc2J1aWxkT3B0aW9uczoge1xyXG4gICAgICAgIHJlc29sdmVFeHRlbnNpb25zOiBleHRlbnNpb25zLFxyXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS1wbHVnaW4tcmVhY3QvaXNzdWVzLzE5MiNpc3N1ZWNvbW1lbnQtMTYyNzM4NDY3MFxyXG4gICAgICAgIGpzeDogJ2F1dG9tYXRpYycsXHJcbiAgICAgICAgLy8gbmVlZCBlaXRoZXIgdGhpcyBvciB0aGUgcGx1Z2luIGJlbG93XHJcbiAgICAgICAgbG9hZGVyOiB7XHJcbiAgICAgICAgICAnLmpzJzogJ2pzeCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICBlc2J1aWxkRmxvd1BsdWdpbigvXFwuKGZsb3d8anN4KSQvLCAocGF0aCkgPT5cclxuICAgICAgICAgICAgL1xcLmpzeD8kLy50ZXN0KHBhdGgpID8gJ2pzeCcgOiAnanN4JyxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAgaW5jbHVkZTogWydAcGFja3JhdC92YWxpZGF0aW9ucyddLFxyXG4gICAgICBleGNsdWRlOiBbXSxcclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBjb21tb25qc09wdGlvbnM6IHsgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWUgfSxcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgIHJvbGx1cFBsdWdpbihbXHJcbiAgICAgICAgICAgIC9yZWFjdC1uYXRpdmUtdmVjdG9yLWljb25zLyxcclxuICAgICAgICAgICAgL0BleHBvXFwvdmVjdG9yLWljb25zLyxcclxuICAgICAgICAgICAgL3JlYWN0LW5hdGl2ZS10YWJsZS1jb21wb25lbnQvLFxyXG4gICAgICAgICAgICAvQGV4cG8vLFxyXG4gICAgICAgICAgICAvZXhwby1yb3V0ZXIvLFxyXG4gICAgICAgICAgICAvZXhwby1jbGlwYm9hcmQvLFxyXG4gICAgICAgICAgICAvZXhwby1tb2R1bGVzLWNvcmUvLFxyXG4gICAgICAgICAgXSksXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgcG9ydDogNDIwMCxcclxuICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXHJcbiAgICB9LFxyXG4gICAgcHJldmlldzoge1xyXG4gICAgICBwb3J0OiA0MzAwLFxyXG4gICAgICBob3N0OiAnbG9jYWxob3N0JyxcclxuICAgIH0sXHJcbiAgICB0ZXN0OiB7XHJcbiAgICAgIGdsb2JhbHM6IHRydWUsXHJcbiAgICAgIGNhY2hlOiB7IGRpcjogJy4uLy4uL25vZGVfbW9kdWxlcy8udml0ZXN0JyB9LFxyXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuICAgICAgaW5jbHVkZTogWydzcmMvKiovKi57dGVzdCxzcGVjfS57anMsbWpzLGNqcyx0cyxtdHMsY3RzLGpzeCx0c3h9J10sXHJcbiAgICB9LFxyXG4gIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThULFNBQVMsb0JBQTZCO0FBQ3BXLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsT0FBTyx1QkFBdUI7QUFDOUIsU0FBUywwQkFBMEI7QUFDbkMsU0FB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
