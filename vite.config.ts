import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import webfontDownload from 'vite-plugin-webfont-dl'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    webfontDownload(),
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg,woff2}']
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'HyCalc',
        short_name: 'HyCalc',
        description: 'Hybrid workplace calculator',
        theme_color: '#2f2b3a',
        icons: [
          {
            src: 'favicon-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'favicon-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    }),
  ],
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
