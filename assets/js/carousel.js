document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const prev = document.getElementById('prev-slide');
  const next = document.getElementById('next-slide');
  const dots = Array.from(document.querySelectorAll('.carousel-dot'));
  const carousel = document.querySelector('.carousel');
  let current = 0;
  function show(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
      if (dots[i]) dots[i].classList.toggle('active', i === index);
    });
    current = index;
  }
  if (next) next.addEventListener('click', () => show((current + 1) % slides.length));
  if (prev) prev.addEventListener('click', () => show((current - 1 + slides.length) % slides.length));
  dots.forEach((d, i) => d.addEventListener('click', () => show(i)));
  let startX;
  if (carousel) {
    carousel.addEventListener('mousedown', e => { startX = e.clientX; carousel.classList.add('dragging'); });
    carousel.addEventListener('mouseup', e => {
      const diff = e.clientX - startX;
      if (diff > 50) prev.click();
      if (diff < -50) next.click();
      carousel.classList.remove('dragging');
    });
  }
  show(0);
});
