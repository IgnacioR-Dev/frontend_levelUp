// ===== LocalStorage =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ===== Referencias del DOM =====
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const clearCartBtn = document.getElementById('clearCart');
const checkoutBtn = document.getElementById('checkout');

// ===== Función para renderizar el carrito =====
function renderCart() {
    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="empty-cart">Tu carrito está vacío.</p>';
        cartTotalEl.textContent = '0';
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item d-flex justify-content-between align-items-center mb-3 p-2 rounded shadow-sm';
        itemEl.innerHTML = `
            <img src="${item.imagen}" alt="${item.name}" class="cart-item-img">
            <div class="item-info flex-grow-1 ms-3">
                <h5>${item.name}</h5>
                <p class="mb-1">$${item.price} x ${item.quantity}</p>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-outline-secondary decrease" data-index="${index}">-</button>
                    <button class="btn btn-sm btn-outline-secondary increase" data-index="${index}">+</button>
                    <button class="btn btn-sm btn-outline-danger remove" data-index="${index}">Eliminar</button>
                </div>
            </div>
            <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
        `;

        cartItemsEl.appendChild(itemEl);
    });

    cartTotalEl.textContent = total.toFixed(2);

    // ===== Eventos de los botones =====
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = e.target.dataset.index;
            cart[idx].quantity++;
            saveCart();
        });
    });

    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = e.target.dataset.index;
            if (cart[idx].quantity > 1) {
                cart[idx].quantity--;
                saveCart();
            }
        });
    });

    document.querySelectorAll('.remove').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = e.target.dataset.index;
            cart.splice(idx, 1);
            saveCart();
        });
    });
}

// ===== Guardar carrito =====
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// ===== Vaciar carrito =====
clearCartBtn.addEventListener('click', () => {
    cart = [];
    saveCart();
});

// ===== Checkout (simulado) =====
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }
    alert('Compra finalizada. Total: $' + cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
    cart = [];
    saveCart();
});

// ===== Render inicial =====
renderCart();
