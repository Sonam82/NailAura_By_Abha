# UX and motion update — 18 October 2026

Scope: refine the existing storefront while retaining its approved branding.

Code-review findings addressed:
- Search and sorting were lost when returning to the collection. Search, category and sort now remain in the URL; a clear-filters button resets them in place.
- Removing a bag item was irreversible. Undo restores its selected options and quantity, including when the last item is removed.
- Several touch controls were undersized. Save, filter, quantity and header controls are larger; mobile form text is 16px to avoid automatic zoom on focus.
- Bag delivery eligibility was text-only. A labelled progress indicator now accompanies the existing estimate.
- The add-to-bag amount did not reflect selected quantity. It now updates while quantity changes.
- Navigation was lost on long pages. The header stays accessible, and the mobile menu dismisses on Escape, outside click or focus leaving the header.

Motion: one-time in-view entrances, brief save and bag feedback, collection-result entrances, menu and FAQ transitions, and restrained hover effects. No scroll hijacking, autoplay or continuously moving decoration. Content remains visible if animation APIs fail. System reduced-motion changes disable CSS effects and cancel running JavaScript animations.

Verification: Node tests, JavaScript syntax checks and all-page local link/asset validation. Current browser inventory contains no apps or browsers, so visual desktop/mobile, focus and real screen-reader checks remain unverified. This is a source review and implementation, not a screenshot-based design audit.
