// Build an interactive carousel with seamless looping
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-button.next');
  const prevBtn = document.querySelector('.carousel-button.prev');
  const dots = document.querySelector('.carousel-dots');
  if (!track || !Array.isArray(slideData)) return;
  track.innerHTML = '';
  if (dots) dots.innerHTML = '';
  const lang = localStorage.getItem('lang') || 'en';

  const createSlide = (item) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-item';
    slide.dataset.id = item.id;

    const link = document.createElement('a');
    link.href = `slide-detail.html?id=${item.id}`;

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = 'Carousel slide';
    img.draggable = false;

    const text = document.createElement('div');
    text.className = 'slide-text';
    text.textContent = (item[lang] || item.en).text;

    link.appendChild(img);
    link.appendChild(text);
    slide.appendChild(link);
    return slide;
  };

  // build slides with clones for infinite scrolling
  track.appendChild(createSlide(slideData[slideData.length - 1]));
  slideData.forEach(item => track.appendChild(createSlide(item)));
  track.appendChild(createSlide(slideData[0]));

  if (dots) {
    slideData.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        moveToSlide(i + 1);
        resetInterval();
      });
      dots.appendChild(dot);
    });
  }

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

  function updateDots() {
    if (!dots) return;
    const activeIndex = (index - 1 + slideData.length) % slideData.length;
    const dotEls = dots.querySelectorAll('.carousel-dot');
    dotEls.forEach((d, i) => {
      if (i === activeIndex) d.classList.add('active');
      else d.classList.remove('active');
    });
  }

  track.addEventListener('transitionend', () => {
    if (index === 0) {
      moveToSlide(slideData.length, false);
    } else if (index === slideData.length + 1) {
      moveToSlide(1, false);
    }
    updateDots();
  });

  const next = () => { moveToSlide(index + 1); resetInterval(); };
  const prev = () => { moveToSlide(index - 1); resetInterval(); };

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  // drag/swipe support
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
  let interval = setInterval(() => moveToSlide(index + 1), 3000);
  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(() => moveToSlide(index + 1), 3000);
  }
}

document.addEventListener('DOMContentLoaded', initCarousel);

function updateCarouselLang(lang) {
  document.querySelectorAll('.carousel-track .carousel-item').forEach(slide => {
    const id = parseInt(slide.dataset.id, 10);
    const data = slideData.find(s => s.id === id);
    if (!data) return;
    const text = slide.querySelector('.slide-text');
    if (text) text.textContent = (data[lang] || data.en).text;
  });
}
