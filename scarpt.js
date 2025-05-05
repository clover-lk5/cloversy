const productListEl = document.getElementById("product-list");
const categorySelect = document.getElementById("category");
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const applyFiltersBtn = document.getElementById("apply-filters");
const loadMoreBtn = document.getElementById("load-more");
const backBtn = document.getElementById("back-btn");
const cartCountEl = document.getElementById("cart-count");
const searchInput = document.getElementById("search-input");

const products = [
  { id: 1, name: "iPhone 13 Mini", price: 699, image: "images/image.6.webp", category: "phones" },
  { id: 2, name: "Galaxy Buds Pro", price: 120, image: "images/image-nova.webp", category: "audio" },
  { id: 3, name: "HP Envy x360", price: 899, image: "images/image.4.webp", category: "laptops" },
  { id: 4, name: "Echo Dot 4th Gen", price: 49, image: "images/image.5.webp", category: "audio" },
  { id: 5, name: "MacBook Pro M2", price: 1300, image: "images/image.7.webp", category: "laptops" },
  { id: 6, name: "OnePlus 11", price: 649, image: "images/image.8.webp", category: "phones" },
  { id: 7, name: "Sony WH-1000XM5", price: 379, image: "images/image.9.webp", category: "audio" },
  { id: 8, name: "Dell XPS 13", price: 999, image: "images/image.10.webp", category: "laptops" }
];

let visibleCount = 6;
let filteredProducts = [...products];
let currentPage = 0;
const productsPerPage = 6; // Number of products per page

function renderProducts() {
  productListEl.innerHTML = "";
  const toShow = filteredProducts.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);

  if (toShow.length === 0) {
    productListEl.innerHTML = "<p>No products found.</p>";
    loadMoreBtn.style.display = "none";
    return;
  }

  toShow.forEach((product) => {
    const productEl = document.createElement("div");
    productEl.className = "product";
    productEl.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>$${product.price}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      <button class="view-details" data-id="${product.id}">View Details</button>
    `;
    productListEl.appendChild(productEl);
  });

  updateButtonVisibility();
}

function updateButtonVisibility() {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (currentPage === 0) {
    loadMoreBtn.style.display = 'block'; // Show "Load More"
    backBtn.style.display = 'none'; // Hide "Back"
  } else if (currentPage === totalPages - 1) {
    loadMoreBtn.style.display = 'none'; // Hide "Load More"
    backBtn.style.display = 'block'; // Show "Back"
  } else {
    loadMoreBtn.style.display = 'block'; // Show "Load More"
    backBtn.style.display = 'block'; // Show "Back"
  }
}

function filterProducts(category, min, max, keyword = "") {
  const minPrice = parseFloat(min) || 0;
  const maxPrice = parseFloat(max) || Infinity;
  const searchTerm = keyword.toLowerCase();

  filteredProducts = products.filter((product) => {
    const matchCategory = category === "all" || product.category === category;
    const matchPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchSearch = product.name.toLowerCase().includes(searchTerm);
    return matchCategory && matchPrice && matchSearch;
  });

  currentPage = 0; // Reset to the first page when filters are applied
  renderProducts();
}

// Event Listeners
categorySelect.addEventListener("change", () => {
  filterProducts(categorySelect.value, minPriceInput.value, maxPriceInput.value, searchInput.value);
});

applyFiltersBtn.addEventListener("click", () => {
  filterProducts(categorySelect.value, minPriceInput.value, maxPriceInput.value, searchInput.value);
});

searchInput.addEventListener("input", () => {
  filterProducts(categorySelect.value, minPriceInput.value, maxPriceInput.value, searchInput.value);
});

loadMoreBtn.addEventListener("click", () => {
  currentPage++;
  renderProducts();
});

backBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    renderProducts();
  }
});

productListEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const id = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  if (e.target.classList.contains("view-details")) {
    const id = e.target.dataset.id;
    window.location.href = `product.html?id=${id}`;
  }
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = count > 0 ? count : "";
}

// Init
renderProducts();
updateCartCount();


