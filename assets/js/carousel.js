// Build carousel slides dynamically from slideData
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track || !Array.isArray(slideData)) return;
  track.innerHTML = '';
  slideData.forEach(item => {
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
    track.appendChild(slide);
  });

  const slides = Array.from(track.children);
  let currentIndex = 0;
  function moveToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    moveToSlide(currentIndex);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', initCarousel);
