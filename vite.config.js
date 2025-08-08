import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '2decfc76-db9b-4fb1-ab27-70442a18cfc3-00-n0d6es51ecwk.spock.replit.dev'
    ],
  },
});