document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('products-container');
  if (container) {
    productData.forEach(p => {
      const item = document.createElement('div');
      item.className = 'product-item';
      item.innerHTML = `
        <a href="product-detail.html?id=${p.id}">
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
        </a>
        <p>${p.short}</p>`;
      container.appendChild(item);
    });
  }
});
