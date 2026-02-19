/**
 * Tabs — Season activity tabs with ARIA
 */
(function () {
  const buttons = document.querySelectorAll('.tabs__btn[data-tab]');
  const panels = document.querySelectorAll('.tabs__panel');

  if (!buttons.length) return;

  function activate(tabId) {
    buttons.forEach(btn => {
      const isActive = btn.dataset.tab === tabId;
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    panels.forEach(panel => {
      const isVisible = panel.id === `tab-${tabId}`;
      panel.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      activate(btn.dataset.tab);
    });

    /* Keyboard navigation (arrow keys) */
    btn.addEventListener('keydown', (e) => {
      const btns = [...buttons];
      const idx = btns.indexOf(btn);
      let next;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        next = btns[(idx + 1) % btns.length];
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        next = btns[(idx - 1 + btns.length) % btns.length];
      } else if (e.key === 'Home') {
        e.preventDefault();
        next = btns[0];
      } else if (e.key === 'End') {
        e.preventDefault();
        next = btns[btns.length - 1];
      }

      if (next) {
        next.focus();
        activate(next.dataset.tab);
      }
    });
  });
})();
