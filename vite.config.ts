import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react(), tailwindcss()],

    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      host: true,              // cho phép truy cập từ bên ngoài
      port: 5173,              // port mặc định của Vite
      // sử dụng true để cho phép tất cả hosts, tương đương với "all" trước đó
      allowedHosts: true,      // QUAN TRỌNG: cho phép ngrok
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: {
        ignored: ['**/db.json'],
      },
    },
  };
});