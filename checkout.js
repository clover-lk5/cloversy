function renderOrderSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const summaryList = document.getElementById('summary-list');
  const totalAmountEl = document.getElementById('totalAmount');
  summaryList.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    summaryList.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.classList.add('summary-item');
    div.innerHTML = `
      <span>${item.name}</span>
      <span>Qty: ${item.quantity}</span>
      <span>$${(itemTotal).toFixed(2)}</span>
    `;
    summaryList.appendChild(div);
  });

  totalAmountEl.textContent = total.toFixed(2);
}

document.getElementById('checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const paymentMethodEl = document.querySelector('input[name="payment-method"]:checked');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!name || !email || !address || !paymentMethodEl) {
    alert('Please fill in all fields and choose a payment method!');
    return;
  }
  else {
    alert('your order has been placed');
  }

  const paymentMethod = paymentMethodEl.value;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const order = {
    name,
    email,
    address,
    paymentMethod,
    cart,
    total
  };

  // Simulate order processing
  console.log("Order confirmed:", order);

  // Clear localStorage, form fields, and cart display
  localStorage.removeItem('cart');
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('address').value = '';
  document.querySelectorAll('input[name="payment-method"]').forEach(input => input.checked = false);
  renderOrderSummary();

  // Show a clean confirmation alert
  alert('Thank you! Your order has been confirmed and a confirmation email will be sent.');

  // Redirect to the shop or home page
  window.location.href = 'shop.html'; // or 'home.html'
});

// Shipping estimate handling
const regionSelect = document.getElementById("regionSelect");
const shippingEstimate = document.getElementById("shippingEstimate");

regionSelect.addEventListener("change", function () {
  const region = regionSelect.value;

  if (region === "domestic") {
    shippingEstimate.textContent = "Estimated delivery time: 3-5 business days.";
  } else if (region === "international") {
    shippingEstimate.textContent = "Estimated delivery time: 7-14 business days.";
  } else if (region === "europe") {
    shippingEstimate.textContent = "Estimated delivery time: 5-7 business days.";
  } else {
    shippingEstimate.textContent = "Please select a region to see the estimated delivery time.";
  }
});

function clearCart() {
  localStorage.removeItem('cart');
  renderOrderSummary();
}

renderOrderSummary();