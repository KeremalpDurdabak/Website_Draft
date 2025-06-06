function applyTranslations(lang) {
  const dict = lang === 'tr' ? lang_tr : lang_en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);

  if (typeof updateProducts === 'function') updateProducts(lang);
  if (typeof updateCarouselLang === 'function') updateCarouselLang(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('lang') || 'en';
  const switcher = document.getElementById('lang-switch');
  if (switcher) {
    switcher.value = stored;
    switcher.addEventListener('change', e => applyTranslations(e.target.value));
  }
  applyTranslations(stored);
});
