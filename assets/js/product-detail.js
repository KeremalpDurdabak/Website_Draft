document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const product = productData.find(p => p.id === id);
  const container = document.getElementById('product-detail');
  const lang = localStorage.getItem('lang') || 'en';
  if (!container) return;
  if (product) {
    const t = product[lang] || product.en;
    container.innerHTML = `
      <h2>${t.name}</h2>
      <img src="${product.largeImage}" alt="${t.name}">
      <p>${t.details}</p>
      <p><a href="products.html">&laquo; Back to products</a></p>`;
  } else {
    const dict = lang === 'tr' ? lang_tr : lang_en;
    container.textContent = dict.notFound;
  }
});
