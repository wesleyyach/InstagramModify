import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5174,
    open: true
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
}) 