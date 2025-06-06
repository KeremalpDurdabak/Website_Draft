function applyTranslations(lang) {
  const dict = lang === 'tr' ? lang_tr : lang_en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);
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
