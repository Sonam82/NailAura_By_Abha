# NailAura by Abha

NailAura by Abha is a luxury B2C e-commerce website for an artisan press-on nail brand. It showcases and sells handcrafted, salon-grade builder gel nail sets through an elegant, responsive online storefront.

A responsive static storefront using the original brand logo, warm ivory palette, dusty rose accents, and ink typography. Includes 16 pages: Home, Shop, Product Detail, About, Sizing Guide, Care Instructions, FAQs, Contact, Wishlist, Cart, Checkout, Shipping Policy, Returns & Exchanges, Privacy Policy, Terms & Conditions, and 404.

## Preview

Run a local server:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser. The site also functions directly from `index.html`; a local server is recommended for consistent browser storage.

## Project Structure & Customization

- **Copy & Navigation**: Edit in `scripts/build_site.py`.
- **Product Catalog**: Edit in `assets/products.json`.
- **Regenerate Site**: Run `python scripts/build_site.py` to rebuild HTML pages and `assets/js/catalog.js`.
- **Shared Styles**: `assets/css/styles.css`.
- **Interactive UI & Drawer Controls**: `assets/js/app.js`.
- **Cart & Wishlist State**: `assets/js/store.js`.

## Automated Checks & Validation

```bash
node --test tests/store.test.cjs tests/pages.test.cjs tests/interactions.test.cjs
node --check assets/js/app.js
python scripts/check_site.py
```

Tests cover price calculations, free shipping threshold calculations, stored data recovery, product variant selections, cart updates, live search filtering, and empty/error states.

## Live Order Integrations

The shopping experience maintains client-side cart and wishlist state via `localStorage`. For production launch, connect your live payment gateway (e.g. Razorpay / UPI), shipping carrier API (e.g. Shiprocket), and business WhatsApp API (+91 98765 43210).

Generated image assets and contact sheets are documented in `docs/redesign-plan.md`. The original archive is preserved in `docs/before-redesign.zip`.

Motion and shopping UX refinements are described in `docs/ux-improvements.md`. Effects live in `assets/js/interactions.js` and respect the system reduced-motion preference. Tests use mocked DOM objects; real-browser visual and accessibility verification remains outstanding because no browser was connected during this update.
