# Post-deploy verification checklist

After deploying to Vercel, run through this list.

## Form & thank-you
- [ ] Submit the contact form on the live site; confirm you receive the email and the “Thank you for your submission!” toast appears (no redirect)
- [ ] Submit a quote form on a demo (restaurant, plumber, or electrician); confirm the same toast and that the submission appears in Formspree

## CTAs & links
- [ ] Click "Get Your Free Quote" and "Get Quote" (hero and mobile bar); confirm they scroll to contact or open correctly
- [ ] Click "Call" and "Email" in the mobile CTA bar (on a phone or narrow viewport); confirm tel: and mailto: work
- [ ] Click "Visit site" and "Get one like this" on the Portfolio page; confirm they go to the right URLs

## SEO & URLs
- [ ] If your live URL is not `https://forestcitydigital.com`, update:
  - `index.html`: `og:image` content, LocalBusiness JSON-LD `url`
  - `sitemap.xml`: all `<loc>` URLs
  - `robots.txt`: `Sitemap:` URL
- [ ] Optionally add an image at `assets/og-image.png` (1200×630) for social sharing, or remove/update the `og:image` meta tag

## Quick checks
- [ ] Home and Portfolio load without errors
- [ ] Mobile CTA bar appears after scrolling on a narrow viewport
- [ ] Testimonials and trust strip are visible and readable
