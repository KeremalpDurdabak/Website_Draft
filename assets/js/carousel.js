function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-button.next');
  const prevBtn = document.querySelector('.carousel-button.prev');
  if (!track) return;

  const originalSlides = Array.from(track.children);
  if (originalSlides.length === 0) return;

  // add clones for seamless looping
  track.insertBefore(originalSlides[originalSlides.length - 1].cloneNode(true), track.firstChild);
  track.appendChild(originalSlides[0].cloneNode(true));
  const slides = Array.from(track.children);

  let index = 1;
  let slideWidth = track.getBoundingClientRect().width;

  const updateWidth = () => {
    slideWidth = track.getBoundingClientRect().width;
    moveToSlide(index, false);
  };
  window.addEventListener('resize', updateWidth);

  function moveToSlide(i, animate = true) {
    if (animate) track.style.transition = 'transform 0.5s ease-in-out';
    else track.style.transition = 'none';
    track.style.transform = `translateX(-${i * 100}%)`;
    index = i;
    updateDots();
  }

  track.addEventListener('transitionend', () => {
    if (index === 0) {
      moveToSlide(originalSlides.length, false);
    } else if (index === originalSlides.length + 1) {
      moveToSlide(1, false);
    }
  });

  const next = () => { moveToSlide(index + 1); resetInterval(); };
  const prev = () => { moveToSlide(index - 1); resetInterval(); };

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  const dots = Array.from(document.querySelectorAll('.carousel-dot'));
  function updateDots() {
    const activeIndex = (index - 1 + originalSlides.length) % originalSlides.length;
    dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
  }
  dots.forEach((d, i) => d.addEventListener('click', () => {
    moveToSlide(i + 1);
    resetInterval();
  }));

  let isDragging = false;
  let startX = 0;
  let moveX = 0;
  let hasMoved = false;

  const getEventX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const startDrag = (e) => {
    e.preventDefault();
    isDragging = true;
    startX = getEventX(e);
    moveX = 0;
    hasMoved = false;
    track.style.transition = 'none';
  };

  const duringDrag = (e) => {
    if (!isDragging) return;
    moveX = getEventX(e) - startX;
    if (Math.abs(moveX) > 5) hasMoved = true;
    const movePercent = (moveX / slideWidth) * 100;
    track.style.transform = `translateX(calc(-${index * 100}% + ${movePercent}%))`;
  };

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.5s ease-in-out';
    if (Math.abs(moveX) > slideWidth / 4) {
      if (moveX < 0) index += 1; else index -= 1;
    }
    moveToSlide(index);
    resetInterval();
  };

  track.addEventListener('mousedown', startDrag);
  track.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('mousemove', duringDrag);
  track.addEventListener('click', (e) => { if (hasMoved) e.preventDefault(); }, true);
  window.addEventListener('touchmove', duringDrag, { passive: true });
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchend', endDrag);
  window.addEventListener('mouseleave', endDrag);

  moveToSlide(index, false);
  let interval = setInterval(() => moveToSlide(index + 1), 4000);
  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(() => moveToSlide(index + 1), 4000);
  }
}

document.addEventListener('DOMContentLoaded', initCarousel);
