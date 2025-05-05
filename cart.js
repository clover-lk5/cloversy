document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalItemsEl = document.getElementById("totalItems");
    const totalPriceEl = document.getElementById("totalPrice");
    const cartCountEls = document.querySelectorAll(".cart-count");
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
    }
  
    function updateCartUI() {
      cartItemsContainer.innerHTML = "";
  
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalItemsEl.textContent = "0";
        totalPriceEl.textContent = "0";
        cartCountEls.forEach(el => el.textContent = "0");
        return;
      }
  
      let totalItems = 0;
      let totalPrice = 0;
  
      cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
  
        const itemEl = document.createElement("div");
        itemEl.className = "cart-item";
  
        itemEl.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="item-info">
            <h4>${item.name}</h4>
            <p>₦${item.price.toLocaleString()}</p>
          </div>
          <div class="quantity-controls">
            <button onclick="changeQuantity(${index}, -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${index}, 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;
  
        cartItemsContainer.appendChild(itemEl);
      });
  
      totalItemsEl.textContent = totalItems;
      totalPriceEl.textContent = totalPrice.toLocaleString();
      cartCountEls.forEach(el => el.textContent = totalItems);
    }
  
    window.changeQuantity = (index, delta) => {
      cart[index].quantity += delta;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      saveCart();
    };
  
    window.removeItem = (index) => {
      cart.splice(index, 1);
      saveCart();
    };
  
    window.clearCart = () => {
      if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        saveCart();
      }
    };
  
    window.goToCheckout = () => {
      if (cart.length === 0) {
        alert("Your cart is empty.");
      } else {
        window.location.href = "checkout.html";
      }
    };
  
    updateCartUI();
  });