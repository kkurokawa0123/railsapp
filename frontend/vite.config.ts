/// <reference types="vitest/config" />

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: true,
      port: 8000,
      proxy: {
        '/api': {
          target: 'http://back:3000',
          changeOrigin: false,
        },
      },
    },

    plugins: [react(), tailwindcss(), tsconfigPaths()],

    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    },

    base: env.VITE_BASE_PATH ?? '/',
  };
});
