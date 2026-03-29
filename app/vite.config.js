import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';

// In dev, serve /assets and /demos from repo root (parent of app) so images and demos load
function serveParentAssets() {
  const parent = path.resolve(__dirname, '..');
  return {
    name: 'serve-parent-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlPath = req.url?.split('?')[0] || '';
        if (urlPath.startsWith('/assets/')) {
          const decoded = decodeURIComponent(urlPath).replace(/^\//, '');
          const file = path.join(parent, decoded);
          if (fs.existsSync(file) && fs.statSync(file).isFile()) {
            const ext = path.extname(file);
            const types = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.gif': 'image/gif', '.webp': 'image/webp', '.mp4': 'video/mp4', '.ico': 'image/x-icon' };
            res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
            fs.createReadStream(file).pipe(res);
            return;
          }
        }
        if (urlPath.startsWith('/demos/')) {
          const decoded = decodeURIComponent(urlPath).replace(/^\//, '');
          const file = path.join(parent, decoded);
          if (fs.existsSync(file) && fs.statSync(file).isFile()) {
            const ext = path.extname(file);
            const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
            res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
            fs.createReadStream(file).pipe(res);
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), serveParentAssets()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    fs: { allow: [__dirname, path.resolve(__dirname, '..')] },
  },
  publicDir: 'public',
  build: {
    outDir: '..',
    emptyOutDir: false,
    assetsDir: 'static',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
});
