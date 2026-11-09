import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { linguiTransformerBabelPreset } from '@lingui/vite-plugin'

export default defineConfig({
  plugins: [react(), babel({ presets: [linguiTransformerBabelPreset()] })],
  build: { outDir: 'build' },
  server: {
    host: '127.0.0.1',
    port: 3000,
    strictPort: true,
    allowedHosts: ['host.docker.internal'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
