/**
 * FAQ — Smooth accordion with <details>/<summary>
 */
(function () {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  items.forEach(details => {
    const summary = details.querySelector('summary');
    const body = details.querySelector('.accordion-body');
    if (!summary || !body) return;

    let animation = null;

    summary.addEventListener('click', (e) => {
      e.preventDefault();

      if (animation) animation.cancel();

      if (details.open) {
        /* Closing */
        const startHeight = details.offsetHeight + 'px';
        const endHeight = summary.offsetHeight + 'px';

        if (prefersReducedMotion) {
          details.open = false;
          return;
        }

        animation = details.animate(
          { height: [startHeight, endHeight] },
          { duration: 300, easing: 'cubic-bezier(.22,1,.36,1)' }
        );
        animation.onfinish = () => {
          details.open = false;
          animation = null;
        };
      } else {
        /* Opening */
        details.open = true;

        if (prefersReducedMotion) return;

        const startHeight = summary.offsetHeight + 'px';
        const endHeight = details.offsetHeight + 'px';

        animation = details.animate(
          { height: [startHeight, endHeight] },
          { duration: 300, easing: 'cubic-bezier(.22,1,.36,1)' }
        );
        animation.onfinish = () => {
          animation = null;
        };
      }
    });
  });
})();
