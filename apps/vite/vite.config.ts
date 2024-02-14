import { tamaguiExtractPlugin, tamaguiPlugin } from '@tamagui/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { resolve } from 'path' // Import resolve from the path module

const shouldExtract = process.env.EXTRACT === '1'

const tamaguiConfig = {
  components: ['tamagui'],
  config: 'src/tamagui.config.ts',
}

export default defineConfig({
  clearScreen: true,
  plugins: [
    react(),
    tamaguiPlugin(tamaguiConfig),
    shouldExtract ? tamaguiExtractPlugin(tamaguiConfig) : null,
  ].filter(Boolean),
  resolve: { // Add the resolve configuration
    alias: {
      '@env': resolve(__dirname, 'envResolver'), 
    },
  },
})
