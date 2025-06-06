function renderProducts(containerId, lang) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  productData.forEach(p => {
    const t = p[lang] || p.en;
    const item = document.createElement('div');
    item.className = 'product-item';
    item.innerHTML = `
      <a href="product-detail.html?id=${p.id}">
        <img src="${p.image}" alt="${t.name}">
        <h3>${t.name}</h3>
      </a>
      <p>${t.short}</p>`;
    container.appendChild(item);
  });
}

function updateProducts(lang) {
  ['products-container', 'home-products'].forEach(id => renderProducts(id, lang));
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang') || 'en';
  updateProducts(lang);
  const switcher = document.getElementById('lang-switch');
  if (switcher) switcher.addEventListener('change', e => updateProducts(e.target.value));
});
