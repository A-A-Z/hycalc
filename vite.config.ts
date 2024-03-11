import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import webfontDownload from 'vite-plugin-webfont-dl'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), webfontDownload()],
  resolve: {
    alias: {
      features: path.resolve(__dirname, './src/features'),
      global: path.resolve(__dirname, './src/global'),
      lib: path.resolve(__dirname, './src/lib')
    }
  }
})
