import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chalocar.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
    fs: {
      strict: false,
    },
  },
});
