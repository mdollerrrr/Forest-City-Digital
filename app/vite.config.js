import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: 'public',
  // Build to repo root so the React app replaces the static site. JS/CSS go in /static/ to avoid overwriting /assets/
  build: {
    outDir: '..',
    emptyOutDir: false,
    assetsDir: 'static',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
});
