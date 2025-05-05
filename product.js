// Retrieve product data from localStorage
const product = JSON.parse(localStorage.getItem("selectedProduct"));

if (product) {
  document.getElementById("productImage").src = product.image;
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productPrice").textContent = "₦" + product.price.toLocaleString();
  document.getElementById("productDescription").textContent = product.description || "No description available.";
}

// Add to cart logic
document.getElementById("addToCartBtn").addEventListener("click", () => {
  let quantity = parseInt(document.getElementById("quantity").value);

  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find(item => item.name === product.name);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
});

// Recommended Products - 6 items
const recommendedProducts = [
  {
    name: "Wireless Headphones",
    price: 15000,
    image: "images/headphones1.jpg",
    description: "High-quality sound and comfortable fit"
  },
  {
    name: "Gaming Laptop",
    price: 90000,
    image: "images/laptop1.jpg",
    description: "High-performance for gaming and work"
  },
  {
    name: "Smart Watch",
    price: 25000,
    image: "images/smartwatch1.jpg",
    description: "Track your health and stay connected"
  },
  {
    name: "Bluetooth Speaker",
    price: 12000,
    image: "images/speaker1.jpg",
    description: "Portable and powerful sound"
  },
  {
    name: "Smartphone Charger",
    price: 2000,
    image: "images/charger1.jpg",
    description: "Fast and efficient charging"
  },
  {
    name: "Power Bank",
    price: 7000,
    image: "images/powerbank1.jpg",
    description: "Charge your devices on the go"
  }
];

// Display recommended products
const recommendedContainer = document.getElementById("recommendedContainer");

recommendedProducts.forEach(product => {
  const productCard = document.createElement("div");
  productCard.classList.add("recommended-card");

  productCard.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h4>${product.name}</h4>
    <p>₦${product.price.toLocaleString()}</p>
    <p>${product.description}</p>
  `;

  productCard.addEventListener("click", () => {
    // Logic for showing the selected product as the main product
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.reload();  // Reload to reflect the new selected product
  });

  recommendedContainer.appendChild(productCard);
});