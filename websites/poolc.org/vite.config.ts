import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

const DEFAULT_DEV_API_BASE_URL = 'http://localhost:8080';

export default defineConfig(({ mode }) => {
  // @see https://stackoverflow.com/a/66389044
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd()));
  const apiProxyTarget = process.env.VITE_API_BASE_URL || DEFAULT_DEV_API_BASE_URL;

  return {
    server: {
      open: process.env.VITE_OPEN !== 'false',
      port: 3000,
      proxy: {
        '/api/mincho': {
          target: apiProxyTarget,
          // target: 'http://localhost:8000',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api\/mincho/, ''),
          secure: false,
        },
      },
    },
    build: {
      outDir: 'build',
    },
    plugins: [react(), tailwindcss()],
    define: {
      'process.env': {},
    },
    resolve: {
      alias: {
        '~': path.join(__dirname, './src'),
      },
    },
  };
});
