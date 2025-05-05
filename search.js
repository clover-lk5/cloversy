const searchInput = document.getElementById('searchInput');
const cancelIcon = document.getElementById('cancelIcon');
const suggestionList = document.getElementById('suggestionList');
const matchingProductsSection = document.getElementById('matchingProductsSection');
const matchingProductsContainer = document.getElementById('matchingProductsContainer');

// Sample product names and details
const productSuggestions = ['Wireless Earbuds', 'Gaming Mouse', 'Smart Watch', 'Laptop Pro', 'Bluetooth Speaker'];
const products = [
  { name: 'Wireless Earbuds', image: 'images/image.1.webp', price: '$49' },
  { name: 'Gaming Mouse', image: 'images/image.2.webp', price: '$29' },
  { name: 'Smart Watch', image: 'images/image.3.webp', price: '$99' },
  { name: 'Laptop Pro', image: 'images/image.4.webp', price: '$899' },
  { name: 'Bluetooth Speaker', image: 'images/image.5.webp', price: '$59' },
];

// Display suggestions
function renderSuggestions(filter = '') {
  suggestionList.innerHTML = '';

  const filtered = productSuggestions.filter(name =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(name => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.innerHTML = `
      <span>${name}</span>
      <i class="ri-arrow-left-up-line"></i>
    `;
    div.addEventListener('click', () => showMatchingProducts(name));
    suggestionList.appendChild(div);
  });
}

// Display products matching a name
function showMatchingProducts(name) {
  matchingProductsContainer.innerHTML = '';
  const matched = products.filter(p => p.name === name);

  if (matched.length > 0) {
    matched.forEach(p => {
      const item = document.createElement('div');
      item.className = 'matching-product-item';
      item.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <h4>${p.name}</h4>
        <p>${p.price}</p>
      `;
      matchingProductsContainer.appendChild(item);
    });
    matchingProductsSection.classList.remove('hidden');
  } else {
    matchingProductsSection.classList.add('hidden');
  }
}

// Cancel icon logic
searchInput.addEventListener('input', () => {
  const value = searchInput.value.trim();
  renderSuggestions(value);
  cancelIcon.style.display = value ? 'block' : 'none';
  matchingProductsSection.classList.add('hidden');
});

cancelIcon.addEventListener('click', () => {
  searchInput.value = '';
  cancelIcon.style.display = 'none';
  renderSuggestions('');
  matchingProductsSection.classList.add('hidden');
});

// Initial load
renderSuggestions('');