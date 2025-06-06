function initCarousel() {
  const carousel = document.getElementById('homeCarousel');
  if (!carousel || !Array.isArray(slideData)) return;

  const inner = carousel.querySelector('.carousel-inner');
  const indicators = carousel.querySelector('.carousel-indicators');
  inner.innerHTML = '';
  indicators.innerHTML = '';
  const lang = localStorage.getItem('lang') || 'en';

  slideData.forEach((item, idx) => {
    const active = idx === 0 ? 'active' : '';
    const text = (item[lang] || item.en).text;
    inner.insertAdjacentHTML('beforeend', `
      <div class="carousel-item ${active}">
        <a href="slide-detail.html?id=${item.id}">
          <img src="${item.image}" class="d-block w-100" alt="Carousel slide">
          <div class="carousel-caption d-none d-md-block">
            <h5 class="slide-text">${text}</h5>
          </div>
        </a>
      </div>`);
    indicators.insertAdjacentHTML('beforeend', `
      <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="${idx}" ${active ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${idx + 1}"></button>`);
  });

  new bootstrap.Carousel(carousel, { interval: 3000, ride: 'carousel' });
}

document.addEventListener('DOMContentLoaded', initCarousel);

function updateCarouselLang(lang) {
  document.querySelectorAll('#homeCarousel .carousel-item').forEach(slide => {
    const id = parseInt(slide.querySelector('a').getAttribute('href').split('=')[1], 10);
    const data = slideData.find(s => s.id === id);
    if (!data) return;
    const caption = slide.querySelector('.slide-text');
    if (caption) caption.textContent = (data[lang] || data.en).text;
  });
}
