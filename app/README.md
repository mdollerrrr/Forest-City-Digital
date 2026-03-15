# Forest City Digital — React app (main site)

The **main site** is now this React app. It replaces the previous static HTML (index, contact, portfolio, thank-you).

## Run locally

```bash
cd app
npm install
npm run dev
```

Open http://localhost:5173

## Replace static site (build to repo root)

From the `app/` directory:

```bash
npm run replace-static
```

This backs up the current root `index.html`, `contact.html`, `portfolio.html`, `thank-you.html` into `_static-backup/`, builds the React app to the repo root (`index.html` + `static/`), and removes the old `contact.html`, `portfolio.html`, `thank-you.html` so the SPA handles those routes. Root `assets/` and `demos/` are left as-is (images and demo sites).

## Assets

The built site uses `/assets/` and `/demos/` at the **repo root**. Keep those folders there; the React app does not copy them. For local dev, copy or symlink into `app/public/` if needed (see `npm run copy-assets`).

## Deployment

Deploy the **repo root** (it contains the built `index.html`, `static/`, `assets/`, `demos/`). Ensure your host serves `index.html` for client-side routes (e.g. `/contact`, `/portfolio`, `/thank-you`). Vercel is configured with a catch-all rewrite to `index.html` for the main site.

## Routes

- `/` — Home
- `/contact` — Contact form (Formspree)
- `/portfolio` — Portfolio with video previews
- `/thank-you` — Thank you (after form submit)
