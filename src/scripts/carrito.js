// carrito.js
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    const clearCartBtn = document.getElementById('clearCart');
    const checkoutBtn = document.getElementById('checkout');

    // Helpers apuntando a los expuestos por global.js
    const getUserCart = window._getUserCart || (() => JSON.parse(localStorage.getItem('cart')||'[]'));
    const setUserCart = window._setUserCart || ((c) => localStorage.setItem('cart', JSON.stringify(c)));
    const clearUserCart = window._clearUserCart || (() => localStorage.removeItem('cart'));
    const updateCartBadge = window._updateCartBadge || (() => {});

    function renderCart() {
        const cart = getUserCart() || [];
        cartItemsEl.innerHTML = '';

        if (!cart || cart.length === 0) {
            cartItemsEl.innerHTML = `
                <div class="alert alert-warning empty-cart" role="alert">
                    <i class="bi bi-cart4"></i> Tu carrito está vacío.
                </div>
            `;
            cartTotalEl.textContent = '0';
            updateCartBadge();
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            total += (item.price * (item.quantity || 0));

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item d-flex justify-content-between align-items-center mb-3 p-2 rounded shadow-sm';
            itemEl.innerHTML = `
                <img src="${item.imagen || ''}" alt="${item.name}" class="cart-item-img" style="width:70px;height:70px;object-fit:cover;border-radius:6px;">
                <div class="item-info flex-grow-1 ms-3">
                    <h5 class="mb-1">${item.name}</h5>
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
        updateCartBadge();

        // listeners
        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', e => {
                const idx = parseInt(e.target.dataset.index, 10);
                const cart = getUserCart();
                cart[idx].quantity = (cart[idx].quantity || 0) + 1;
                setUserCart(cart);
                renderCart();
            });
        });

        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', e => {
                const idx = parseInt(e.target.dataset.index, 10);
                const cart = getUserCart();
                if (cart[idx].quantity > 1) {
                    cart[idx].quantity--;
                    setUserCart(cart);
                    renderCart();
                }
            });
        });

        document.querySelectorAll('.remove').forEach(btn => {
            btn.addEventListener('click', e => {
                const idx = parseInt(e.target.dataset.index, 10);
                const cart = getUserCart();
                cart.splice(idx, 1);
                setUserCart(cart);
                renderCart();
            });
        });
    }

    // Vaciar carrito (con confirmación)
    clearCartBtn.addEventListener('click', () => {
        if (confirm("¿Seguro que quieres vaciar todo el carrito? Esta acción no se puede deshacer.")) {
            clearUserCart();
            renderCart();
        }
    });


    // Checkout (simulado)
    checkoutBtn.addEventListener('click', () => {
        const cart = getUserCart();
        if (!cart || cart.length === 0) {
            alert('Tu carrito está vacío.');
            return;
        }
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        alert('Compra finalizada. Total: $' + total.toFixed(2));
        clearUserCart();
        renderCart();
    });

    // init
    renderCart();
});
