// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true, // Auto-opens browser on dev start
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Useful for debugging production builds
  },
});