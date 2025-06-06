document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const product = productData.find(p => p.id === id);
  const container = document.getElementById('product-detail');
  if (!container) return;
  if (product) {
    container.innerHTML = `
      <h2>${product.name}</h2>
      <img src="${product.largeImage}" alt="${product.name}">
      <p>${product.details}</p>
      <p><a href="products.html">&laquo; Back to products</a></p>`;
  } else {
    container.textContent = 'Product not found.';
  }
});
