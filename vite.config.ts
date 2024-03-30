import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import webfontDownload from 'vite-plugin-webfont-dl'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), webfontDownload()],
  base: '/hycalc/',
  resolve: {
    alias: {
      features: path.resolve(__dirname, './src/features'),
      global: path.resolve(__dirname, './src/global'),
      lib: path.resolve(__dirname, './src/lib')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['cobertura', 'html'],
      exclude: [
        ...configDefaults.exclude
      ]
    }
  }
})
