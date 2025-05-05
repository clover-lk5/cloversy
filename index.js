// Sample product data
const products = [
  {
    id: 'lap-001',
    name: 'Dell XPS 15',
    price: '₦850,000',
    image: 'images/laptop1.webp'
  },
  {
    id: 'audio-002',
    name: 'Sony WH-1000XM5',
    price: '₦210,000',
    image: 'images/audio2.webp'
  },
  {
    id: 'smart-003',
    name: 'Smart Plug Elite',
    price: '₦35,000',
    image: 'images/smart3.webp'
  },
  {
    id: 'game-004',
    name: 'Xbox Controller',
    price: '₦55,000',
    image: 'images/game4.webp'
  }
];

// Inject products into homepage
const grid = document.getElementById('product-grid');
products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" onclick="viewProduct('${product.id}')">
    <h3>${product.name}</h3>
    <p>${product.price}</p>
    <button onclick="addToCart('${product.id}')">Add to Cart</button>
  `;
  grid.appendChild(card);
});

// View product function
function viewProduct(productId) {
  window.location.href = `product.html?id=${productId}`;
}

// Cart management
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Sync cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

// Initial cart count sync
document.addEventListener('DOMContentLoaded', updateCartCount);