document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const slide = slideData.find(s => s.id === id);
  const container = document.getElementById('slide-detail');
  const lang = localStorage.getItem('lang') || 'en';
  if (!container) return;
  if (slide) {
    const t = slide[lang] || slide.en;
    container.innerHTML = `
      <h2>${t.text}</h2>
      <img src="${slide.image}" alt="Slide ${slide.id}">
      <p>${t.details}</p>
      <p><a href="index.html">&laquo; Back to home</a></p>`;
  } else {
    const dict = (localStorage.getItem('lang') === 'tr') ? lang_tr : lang_en;
    container.textContent = dict.notFound;
  }
});
