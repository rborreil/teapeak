/**
 * Carousel — CSS scroll-snap testimonials with arrows
 */
(function () {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (!track || !prevBtn || !nextBtn) return;

  function getCardWidth() {
    const card = track.querySelector('.testimonial-card');
    if (!card) return 300;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.gap) || 24;
    return card.offsetWidth + gap;
  }

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
  });

  /* Keyboard support when track is focused */
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      track.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    }
  });
})();
