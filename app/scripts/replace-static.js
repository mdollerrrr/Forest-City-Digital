/**
 * Backs up the current static HTML files at repo root, then builds the React app
 * so it replaces them. Run from app/: node scripts/replace-static.js
 * After this, the main site is the React SPA (index.html + /static/* at root).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../..');
const backupDir = path.join(root, '_static-backup');
const staticFiles = ['index.html', 'contact.html', 'portfolio.html', 'thank-you.html'];

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}
for (const file of staticFiles) {
  const src = path.join(root, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(backupDir, file));
    console.log('Backed up', file);
  }
}

process.chdir(path.join(__dirname, '..'));
execSync('npm run build', { stdio: 'inherit' });

// Remove old static pages so the SPA handles /contact, /portfolio, /thank-you
for (const file of ['contact.html', 'portfolio.html', 'thank-you.html']) {
  const src = path.join(root, file);
  if (fs.existsSync(src)) {
    fs.unlinkSync(src);
    console.log('Removed', file, '(now served by React app)');
  }
}

console.log('Done. Main site is now the React app. Old static files are in _static-backup/');
