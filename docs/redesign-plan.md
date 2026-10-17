# NailAura redesign — approved 16 October 2026

Goal: complete the existing static storefront with an ivory, rose and black visual system drawn from the supplied logo.

Architecture: retain plain HTML, CSS and JavaScript, with a small Python build script for shared static page chrome. Separate catalog/cart calculations from DOM interactions. No server, payment or message service is configured; checkout must explain that clearly and retain the bag.

Tasks:
- [x] Replace cluttered navigation, homepage and styling with a responsive editorial storefront.
- [x] Use original logo, generated brand hero and coordinated, labelled product illustrations; retain original assets in place.
- [x] Implement filter/search/sort, product variants, persistent bag and saved designs, safe totals and recoverable empty/error states.
- [x] Complete cart, wishlist, checkout, care and 404 pages; redesign existing information and policy pages.
- [x] Validate calculations and local links/assets: 11 Node tests and 16-page HTML validation pass.
- [ ] Verify browser shopping flow, mobile layout and keyboard controls visually. Blocked by absence of connected browsers; responsive CSS and accessible controls are implemented, but real-browser validation is outstanding.

Files: scripts/build_site.py generates all root HTML pages; assets/css/styles.css is the shared design system; assets/js/store.js owns pure state helpers; assets/js/app.js handles interaction; assets/products.json retains catalog source. Tests run with Node's built-in test runner and a Python link checker.

Images: built-in imagegen. brand-hero.png prompt: close-up of anatomically correct feminine hands, warm medium skin, blush almond French nails and pearls on ivory silk, dusty rose background, fine gold ring, soft daylight, no text. nail-collection.png prompt: 4x2 contact sheet of five-nail product illustrations per cell, French blush, milky pink, lavender florals, gold glitter, black hearts, rose quartz, mocha chrome, ivory pearls; consistent ivory backgrounds, no text. Product visuals are illustrative and do not establish exact inventory appearance.

Original HTML, CSS and JavaScript are backed up in before-redesign.zip. Production readiness still requires verified business contacts, fulfillment policies, final product photos and a commerce backend.
