document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.getElementById('cartContainer');
    const totalPriceElement = document.getElementById('totalPrice');
    const checkoutBtn = document.querySelector('.btn-checkout');
    const clearCartBtn = document.querySelector('.btn-clear');

    function getCartItems() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function saveCartItems(items) {
        localStorage.setItem('cart', JSON.stringify(items));
    }

    function updateTotalPrice() {
        const items = getCartItems();
        let total = 0;
        items.forEach(item => {
            const unitPrice = parseFloat(item.price.replace('$', '')) || 0;
            total += unitPrice * item.quantity;
        });
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    function renderCartItems() {
        const items = getCartItems();
        cartContainer.innerHTML = '';

        if (items.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
            totalPriceElement.textContent = '$0.00';
            return;
        }

        items.forEach((item, index) => {
            const unitPrice = parseFloat(item.price.replace('$', '')) || 0;
            const subtotal = (unitPrice * item.quantity).toFixed(2);

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');

            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="details">
                    <h4>${item.name}</h4>
                    <p>Price: $${unitPrice.toFixed(2)}</p>
                    <div class="quantity">
                        <button class="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase">+</button>
                    </div>
                    <p class="subtotal">Subtotal: $${subtotal}</p>
                </div>
                <button class="remove">Remove</button>
            `;

            itemElement.querySelector('.increase').addEventListener('click', () => {
                item.quantity++;
                saveCartItems(items);
                renderCartItems();
            });

            itemElement.querySelector('.decrease').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    saveCartItems(items);
                    renderCartItems();
                }
            });

            itemElement.querySelector('.remove').addEventListener('click', () => {
                items.splice(index, 1);
                saveCartItems(items);
                renderCartItems();
            });

            cartContainer.appendChild(itemElement);
        });

        updateTotalPrice();
    }

    checkoutBtn.addEventListener('click', () => {
        alert('Proceeding to checkout...');
    });

    clearCartBtn.addEventListener('click', () => {
        localStorage.removeItem('cart');
        renderCartItems();
    });

    renderCartItems();
});