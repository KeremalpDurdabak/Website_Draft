// Build an interactive carousel with seamless looping
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-button.next');
  const prevBtn = document.querySelector('.carousel-button.prev');
  if (!track || !Array.isArray(slideData)) return;
  track.innerHTML = '';

  const createSlide = (item) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-item';
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = 'Carousel slide';
    const text = document.createElement('div');
    text.className = 'slide-text';
    text.textContent = item.text;
    slide.appendChild(img);
    slide.appendChild(text);
    return slide;
  };

  // build slides with clones for infinite scrolling
  track.appendChild(createSlide(slideData[slideData.length - 1]));
  slideData.forEach(item => track.appendChild(createSlide(item)));
  track.appendChild(createSlide(slideData[0]));

  const slides = Array.from(track.children);
  let index = 1; // start on the first real slide
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
  }

  track.addEventListener('transitionend', () => {
    if (index === 0) {
      moveToSlide(slideData.length, false);
    } else if (index === slideData.length + 1) {
      moveToSlide(1, false);
    }
  });

  const next = () => { moveToSlide(index + 1); resetInterval(); };
  const prev = () => { moveToSlide(index - 1); resetInterval(); };

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  // drag/swipe support
  let isDragging = false;
  let startX = 0;
  let moveX = 0;

  const getEventX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const startDrag = (e) => {
    isDragging = true;
    startX = getEventX(e);
    moveX = 0;
    track.style.transition = 'none';
  };

  const duringDrag = (e) => {
    if (!isDragging) return;
    moveX = getEventX(e) - startX;
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
  window.addEventListener('touchmove', duringDrag, { passive: true });
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchend', endDrag);
  window.addEventListener('mouseleave', endDrag);

  moveToSlide(index, false);
  let interval = setInterval(() => moveToSlide(index + 1), 3000);
  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(() => moveToSlide(index + 1), 3000);
  }
}

document.addEventListener('DOMContentLoaded', initCarousel);
