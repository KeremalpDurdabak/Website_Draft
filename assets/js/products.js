document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('products-container');
  const lang = localStorage.getItem('lang') || 'en';
  if (container) {
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
});
