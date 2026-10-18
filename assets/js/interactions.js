/* Progressive enhancement: content stays visible if motion APIs are unavailable. */
(function () {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Set();
  function animate(element, frames, options) {
    if (reduced.matches || !element?.animate) return;
    const animation = element.animate(frames, options);
    running.add(animation);
    animation.onfinish = animation.oncancel = () => running.delete(animation);
  }
  reduced.addEventListener?.('change', () => {
    if (reduced.matches) running.forEach(animation => animation.cancel());
  });
  // Only animate when an element is in view; never hide content while it loads.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        animate(entry.target, [
          { opacity: .35, transform: 'translateY(18px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 520, easing: 'cubic-bezier(.2,.7,.2,1)' });
      });
    }, { threshold: .08 });
    document.querySelectorAll('.section-top,.story-image,.story-copy,.steps>div,.closing,.page-heading,.hero-copy,.hero-image')
      .forEach(element => observer.observe(element));
  }
  document.addEventListener('click', event => {
    const save = event.target.closest('[data-save]');
    if (save) animate(save, [
      { transform: 'scale(1)' }, { transform: 'scale(1.16)' }, { transform: 'scale(1)' }
    ], { duration: 280, easing: 'ease-out' });
  });
  document.addEventListener('toggle', event => {
    if (event.target.tagName !== 'DETAILS' || !event.target.open) return;
    animate(event.target.querySelector('.answer'), [
      { opacity: 0, transform: 'translateY(-4px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 200, easing: 'ease-out' });
  }, true);
  document.addEventListener('submit', event => {
    if (event.target.id !== 'product-form' || !event.target.checkValidity()) return;
    animate(document.querySelector('[data-cart-count]'), [
      { transform: 'scale(1)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }
    ], { duration: 300, easing: 'ease-out' });
  });
})();
