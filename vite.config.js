import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: 3000, // Fixed port for consistency
    strictPort: true, // Fail if port is taken, avoid fallback
    allowedHosts: [
      '.replit.dev', // Whitelist Replit dev domains
      '.repl.co', // Whitelist Replit production domains
      '.ngrok-free.app', // Whitelist new ngrok free domains (dynamic tunnels)
      '.ngrok.io', // Whitelist legacy ngrok domains (dynamic tunnels)
      '.trycloudflare.com' // Whitelist Cloudflare Tunnel domains (alternative tunnel)
    ]
  }
});