import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  preview: {
    allowedHosts: ['product-catalog-ui.onrender.com'],
  },

  server: {
    host: true,
  },
});
