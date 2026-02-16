# Demo Site Replication Guide

Quick guide for creating new customer demo websites using the Forest City Digital template system.

---

## Folder Structure

```
demos/
  shared/
    styles.css      ← Base design system (DO NOT edit per-client)
    script.js       ← Shared JS (mobile menu, form handling, toast)
  electrician/      ← Example demo
    index.html
  plumber/
    index.html
  restaurant/
    index.html
  [new-client]/     ← Your new demo goes here
    index.html
```

---

## Step-by-Step: Creating a New Demo

### 1. Copy a Template

Pick the closest existing demo to the new client's industry:

| Client Type           | Copy From      |
|----------------------|----------------|
| Trades/Service (HVAC, roofing, landscaping, cleaning) | `electrician/` or `plumber/` |
| Restaurant/Food/Hospitality | `restaurant/` |
| Professional services | `plumber/` (cleanest layout) |

### 2. Update Colors & Fonts

In the `<style>` block at the top of `index.html`, update `:root` variables:

```css
:root {
    --primary-color: #YOUR_COLOR;        /* Main brand color */
    --primary-color-dark: #DARKER;       /* Slightly darker shade */
    --primary-color-rgb: R, G, B;        /* Same color as RGB values */
    --accent-color: #ACCENT;             /* CTA / highlight color */
    --accent-color-light: #LIGHTER;      /* Lighter accent */
    --font-heading: 'Font Name', serif;  /* Heading font */
    --font-primary: 'Font Name', sans-serif; /* Body font */
}
```

**Picking fonts:** Go to [fonts.google.com](https://fonts.google.com). Good combos:
- Professional: `Poppins` + `Inter`
- Elegant: `Playfair Display` + `Poppins`
- Bold/Modern: `DM Serif Display` + `DM Sans`
- Clean: `Plus Jakarta Sans` + `Inter`

Update the Google Fonts `<link>` in `<head>` to match.

### 3. Update Content

Replace all placeholder content:
- **Business name** (logo, footer, title tag)
- **Phone number** (hero, CTA bar, emergency banner, footer, contact section)
- **Email address**
- **Physical address**
- **Service descriptions** (service cards, detailed service lists)
- **Stats numbers** (stats strip `data-count` attributes)
- **Review/testimonial text**
- **Meta description** in `<head>`

### 4. Update Colors in Glassmorphism

The sticky CTA bar uses glassmorphism. Update the rgba color to match the new primary:

```css
.sticky-cta {
    background: rgba(R, G, B, 0.85);  /* Use primary color RGB values */
}
```

### 5. Add Images

Place client images in `assets/` folder (at project root) and reference with:
```html
<img src="../../assets/image-name.png" alt="Description" loading="lazy">
```

For gallery items, use the `.gallery-img-wrap` pattern:
```html
<div class="gallery-img-wrap">
    <img src="../../assets/photo.png" alt="Description" loading="lazy">
</div>
```

For photos that should fill the card edge-to-edge, add `img-cover`:
```html
<div class="gallery-img-wrap img-cover">
    <img src="../../assets/photo.jpg" alt="Description" loading="lazy">
</div>
```

---

## Cursor AI Prompts

Copy-paste these into Cursor chat to speed up demo creation:

### Create a new demo from scratch

```
Create a new demo website in demos/[business-type]/ for a [business name] - 
a [description of business]. Use the shared styles from ../shared/styles.css 
and ../shared/script.js. 

Match the modernization level of demos/electrician/index.html including:
- Google Fonts with custom heading + body fonts
- Inline <style> with custom :root color variables
- Enhanced hero (min-height 70vh, flex centering, radial gradient)
- Glass CTA wrapper on hero buttons (hero-cta-glass)
- Stats strip with count-up animation after the hero
- Glassmorphism sticky CTA bar (backdrop-filter blur)
- Service cards with 16px border-radius, depth shadows, hover lift
- Staggered transition-delay on grid children
- Focus-visible outlines on buttons
- Button hover translateY(-2px)
- Emergency banner (if applicable)
- Contact form posting to https://formspree.io/f/maqdokll
- Count-up IntersectionObserver script before shared script

Color scheme: [primary hex], [accent hex]
Fonts: [heading font] + [body font]
Phone: [phone number]
Services: [list services]
```

### Modernize an existing demo

```
Apply the same modernization upgrades from demos/electrician/index.html to 
demos/[target]/index.html:

1. Add Google Fonts link for [heading font] + [body font]
2. Add body line-height 1.65, letter-spacing 0.01em
3. Add h1-h6 letter-spacing -0.02em, line-height 1.2
4. Add hero-cta-glass wrapper with backdrop-filter blur
5. Enhanced hero: min-height 70vh, flex centering
6. Service cards: border-radius 16px, deeper shadows, hover scale(1.02)
7. Staggered transition-delays on grid children
8. Glassmorphism sticky CTA: rgba background with backdrop-filter blur
9. Stats strip section after hero with count-up animation
10. Focus-visible outlines on buttons
11. Button hover: translateY(-2px), enhanced box-shadow
```

### Add images to a demo

```
Replace the SVG/emoji placeholders in demos/[target]/index.html with real 
images from the assets/ folder. For gallery items, use the gallery-img-wrap 
pattern with object-fit: contain. For photos, add the img-cover class.
Map images as follows:
- [card name] → [filename.png]
- [card name] → [filename.png]
```

### Swap color scheme

```
Update the color scheme in demos/[target]/index.html:
- Primary: [new hex] (update --primary-color, --primary-color-dark, --primary-color-rgb)
- Accent: [new hex] (update --accent-color, --accent-color-light)
- Update the sticky-cta glassmorphism rgba to match new primary
- Update any hardcoded gradient colors in hero, trust-signals, etc.
```

---

## Modernization Checklist

When creating/upgrading a demo, make sure it has ALL of these:

- [ ] Custom Google Fonts (heading + body)
- [ ] `:root` color variables
- [ ] Enhanced typography (line-height, letter-spacing)
- [ ] Hero: min-height 70vh, flex center, radial gradient layer
- [ ] Hero CTA glass wrapper (backdrop-filter)
- [ ] Stats strip with count-up animation
- [ ] Glassmorphism sticky CTA bar
- [ ] Cards: 16px border-radius, deep shadows, hover lift+scale
- [ ] Staggered transition-delays on grid items
- [ ] Focus-visible outlines on interactive elements
- [ ] Button hover effects (translateY, enhanced shadow)
- [ ] Emergency banner with shine animation (for service businesses)
- [ ] Contact form → Formspree with toast notification
- [ ] Meta description in `<head>`
- [ ] `loading="lazy"` on all images
- [ ] Mobile-responsive (handled by shared styles)

---

## Quick Color Palette Ideas

| Industry       | Primary      | Accent       | Font Combo                    |
|---------------|-------------|-------------|-------------------------------|
| Electrician    | `#0f172a`   | `#fbbf24`   | DM Serif Display + DM Sans   |
| Plumber        | `#1e40af`   | `#3b82f6`   | Poppins + Inter               |
| Restaurant     | `#6B4C5A`   | `#D4A574`   | Playfair Display + Poppins    |
| Landscaping    | `#15803d`   | `#84cc16`   | Plus Jakarta Sans + Inter     |
| Dental         | `#0891b2`   | `#06b6d4`   | DM Sans + Inter               |
| Law Firm       | `#1e293b`   | `#b45309`   | Playfair Display + Inter      |
| Salon/Spa      | `#831843`   | `#f472b6`   | Cormorant Garamond + Poppins  |
| Auto Repair    | `#991b1b`   | `#f59e0b`   | Poppins + Inter               |
| Real Estate    | `#1e3a5f`   | `#d4a76a`   | Playfair Display + DM Sans    |
| Gym/Fitness    | `#18181b`   | `#ef4444`   | Oswald + Inter                |
| Cleaning       | `#0d9488`   | `#2dd4bf`   | Plus Jakarta Sans + Inter     |
