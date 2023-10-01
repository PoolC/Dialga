import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // @see https://stackoverflow.com/a/66389044
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    server: {
      open: true,
      port: 3000,
      proxy: {
        '/api/mincho': {
          target: process.env.VITE_API_BASE_URL,
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
    plugins: [react()],
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
