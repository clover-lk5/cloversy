// Get cart items from localStorage
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.querySelector(".cart-items-grid");
const totalPriceEl = document.querySelector(".total-price");
const emptyCartMsg = document.querySelector(".empty-cart-msg");
const clearBtn = document.querySelector(".clear-btn");

function renderCartItems() {
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    emptyCartMsg.style.display = "block";
    totalPriceEl.textContent = "₦0";
    return;
  } else {
    emptyCartMsg.style.display = "none";
  }

  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-content">
        <h4>${item.name}</h4>
        <p>₦${item.price.toLocaleString()}</p>
        <div class="quantity-controls">
          <button class="decrease-btn" data-index="${index}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-btn" data-index="${index}">+</button>
        </div>
      </div>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    cartContainer.appendChild(itemDiv);
  });

  updateTotal();
}

function updateTotal() {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  totalPriceEl.textContent = `${total.toLocaleString()}`;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

cartContainer.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains("increase-btn")) {
    cartItems[index].quantity++;
    saveCart();
    renderCartItems();
  } else if (e.target.classList.contains("decrease-btn")) {
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity--;
      saveCart();
      renderCartItems();
    }
  } else if (e.target.classList.contains("remove-btn")) {
    cartItems.splice(index, 1);
    saveCart();
    renderCartItems();
  }
});

clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear the cart?")) {
    localStorage.removeItem("cart");
    cartItems.length = 0;
    renderCartItems();
  }
});

document.addEventListener("DOMContentLoaded", renderCartItems);