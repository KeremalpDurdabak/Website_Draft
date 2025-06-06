// Build slides for Bootstrap carousel
function initBootstrapCarousel() {
  const carouselInner = document.querySelector('#homeCarousel .carousel-inner');
  if (!carouselInner || !Array.isArray(slideData)) return;
  const lang = localStorage.getItem('lang') || 'en';
  slideData.forEach((item, idx) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-item' + (idx === 0 ? ' active' : '');

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = 'Carousel slide';
    img.className = 'd-block w-100';

    const caption = document.createElement('div');
    caption.className = 'carousel-caption d-none d-md-block';
    caption.textContent = item[lang]?.text || item.en.text;

    slide.appendChild(img);
    slide.appendChild(caption);
    carouselInner.appendChild(slide);
  });
}

document.addEventListener('DOMContentLoaded', initBootstrapCarousel);
