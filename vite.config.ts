import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // base: '/',
    server: {
      port: Number(env.PORT),
      watch: {
        usePolling: true,
      },
    },
    plugins: [
      react(),
      tsconfigPaths(),
    ],
    resolve: {
      alias: [{ find: /^~/, replacement: '' }],
    },
    build: { chunkSizeWarningLimit: 3000 },
    css: {
      modules: {
        generateScopedName: 'lini-[local]-[hash:base64:5]',
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "src/styles/vars.scss";`,
        },
      },
    },
  };
});
