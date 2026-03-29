# Forest City Digital — React app (main site)

The **main site** is now this React app. It replaces the previous static HTML (index, contact, portfolio, thank-you).

## Run locally

**Option A — Dev server (best for development)**  
From the repo root:

```bash
cd app
npm install
npm run dev
```

Then open **http://localhost:5173**. You get hot reload and the React app with `/`, `/contact`, `/portfolio`, `/thank-you`.

**Option B — Production build (same as Vercel)**  
Build and serve the static output from the repo root:

```bash
cd app
npm run replace-static
cd ..
npx serve .
```

Then open **http://localhost:3000** (or the URL `serve` prints). This uses the same `index.html` + `static/` that Vercel deploys.

## Replace static site (build to repo root)

From the `app/` directory:

```bash
npm run replace-static
```

This backs up the current root `index.html`, `contact.html`, `portfolio.html`, `thank-you.html` into `_static-backup/`, builds the React app to the repo root (`index.html` + `static/`), and removes the old `contact.html`, `portfolio.html`, `thank-you.html` so the SPA handles those routes. Root `assets/` and `demos/` are left as-is (images and demo sites).

## Assets

The built site uses `/assets/` and `/demos/` at the **repo root**. Keep those folders there; the React app does not copy them. For local dev, copy or symlink into `app/public/` if needed (see `npm run copy-assets`).

## Deployment (Vercel)

The repo is set up so **Vercel builds and deploys the right thing**:

- **Install:** runs `cd app && npm ci` (installs app dependencies).
- **Build:** runs `cd app && npm run build` (writes `index.html` and `static/` to the repo root).
- **Output:** the repo root (`.`) is deployed, so the live site has `index.html`, `static/`, `assets/`, and `demos/`.

The catch-all route in `vercel.json` sends all paths (e.g. `/contact`, `/portfolio`) to `index.html`, so the React app handles routing. No need to run `replace-static` before pushing — just push and Vercel will build and deploy.

## Routes

- `/` — Home
- `/contact` — Contact form (Formspree)
- `/portfolio` — Portfolio with video previews
- `/thank-you` — Thank you (after form submit)
